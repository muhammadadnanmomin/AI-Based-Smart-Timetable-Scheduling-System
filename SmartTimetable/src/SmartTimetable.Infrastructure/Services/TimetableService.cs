using Microsoft.EntityFrameworkCore;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;
using SmartTimetable.Infrastructure.Data;

namespace SmartTimetable.Infrastructure.Services;

public class TimetableService : ITimetableService
{
    private readonly AppDbContext _context;

    public TimetableService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<GenerateResultDto> GenerateTimetableAsync()
    {
        var teachers = await _context.Teachers.ToListAsync();
        var subjects = await _context.Subjects.ToListAsync();
        var classes = await _context.Classes.ToListAsync();
        var rooms = await _context.Rooms.ToListAsync();
        var days = await _context.Days.ToListAsync();
        var slots = await _context.TimeSlots.OrderBy(s => s.SlotOrder).ToListAsync();

        if (!teachers.Any() || !subjects.Any() || !classes.Any() ||
            !rooms.Any() || !days.Any() || !slots.Any())
        {
            return new GenerateResultDto { Status = "failed", Message = "Missing required data" };
        }

        var teacherSubjects = await _context.TeacherSubjects.ToListAsync();
        
        var expandedAssignments = new List<SmartTimetable.AI.TeacherSubjectAssignment>();
        foreach (var ts in teacherSubjects)
        {
            if (ts.TeacherId == null || ts.SubjectId == null || ts.ClassId == null) continue;
            var subj = subjects.FirstOrDefault(s => s.Id == ts.SubjectId);
            int lecturesToAssign = subj?.WeeklyLectures > 0 ? subj.WeeklyLectures : 1;
            for (int i = 0; i < lecturesToAssign; i++)
            {
                expandedAssignments.Add(new SmartTimetable.AI.TeacherSubjectAssignment
                {
                    TeacherId = ts.TeacherId.Value,
                    SubjectId = ts.SubjectId.Value,
                    ClassId = ts.ClassId.Value
                });
            }
        }

        if (!expandedAssignments.Any())
        {
            return new GenerateResultDto { Status = "failed", Message = "No teacher-subject assignments found. Please map teachers to subjects and classes first." };
        }

        var scheduleData = new SmartTimetable.AI.ScheduleData
        {
            DayIds = days.Select(d => d.Id).ToList(),
            SlotIds = slots.Select(s => s.Id).ToList(),
            RoomIds = rooms.Select(r => r.Id).ToList(),
            TeacherSubjectAssignments = expandedAssignments
        };

        var prefData = await _context.TeacherPreferences.Select(p => new SmartTimetable.AI.PreferenceData
        {
            TeacherId = p.TeacherId ?? 0,
            PreferredDayId = p.PreferredDayId,
            PreferredSlotId = p.PreferredSlotId,
            Priority = p.Priority ?? 1
        }).ToListAsync();

        // Run Genetic Algorithm
        var generated = SmartTimetable.AI.GeneticAlgorithm.Run(scheduleData, prefData);

        var schedule = generated.Select(g => new TimetableSaveEntryDto
        {
            TeacherId = g.TeacherId,
            SubjectId = g.SubjectId,
            ClassId = g.ClassId,
            RoomId = g.RoomId,
            DayId = g.DayId,
            SlotId = g.SlotId
        }).ToList();

        var conflicts = DetectConflicts(schedule);

        // Clear old and save new timetable
        _context.Timetables.RemoveRange(_context.Timetables);
        foreach (var entry in schedule)
        {
            _context.Timetables.Add(new Timetable
            {
                TeacherId = entry.TeacherId,
                SubjectId = entry.SubjectId,
                ClassId = entry.ClassId,
                RoomId = entry.RoomId,
                DayId = entry.DayId,
                SlotId = entry.SlotId
            });
        }
        await _context.SaveChangesAsync();

        return new GenerateResultDto
        {
            Status = "success",
            Timetable = schedule,
            Conflicts = conflicts
        };
    }

    public async Task<List<TimetableEntryDto>> LoadTimetableAsync()
    {
        var entries = await (
            from te in _context.Timetables
            join s in _context.Subjects on te.SubjectId equals s.Id
            join t in _context.Teachers on te.TeacherId equals t.Id
            join r in _context.Rooms on te.RoomId equals r.Id
            join c in _context.Classes on te.ClassId equals c.Id
            join d in _context.Days on te.DayId equals d.Id
            join ts in _context.TimeSlots on te.SlotId equals ts.Id
            select new TimetableEntryDto
            {
                Id = te.Id,
                Subject = s.Name,
                Teacher = t.Name,
                Room = r.Name,
                ClassName = c.Name,
                Day = d.Name ?? "",
                StartTime = ts.StartTime.ToString(@"hh\:mm\:ss"),
                EndTime = ts.EndTime.ToString(@"hh\:mm\:ss"),
                DayId = te.DayId,
                SlotId = te.SlotId,
                SubjectId = te.SubjectId,
                TeacherId = te.TeacherId,
                RoomId = te.RoomId,
                ClassId = te.ClassId
            }
        ).ToListAsync();

        return entries;
    }

    public async Task SaveTimetableAsync(List<TimetableSaveEntryDto> entries)
    {
        _context.Timetables.RemoveRange(_context.Timetables);

        foreach (var e in entries)
        {
            _context.Timetables.Add(new Timetable
            {
                TeacherId = e.TeacherId,
                SubjectId = e.SubjectId,
                ClassId = e.ClassId,
                RoomId = e.RoomId,
                DayId = e.DayId,
                SlotId = e.SlotId
            });
        }

        await _context.SaveChangesAsync();
    }

    public GenerateResultDto AutoFixConflicts(AutoFixRequest request)
    {
        var schedule = request.Timetable;
        // Simple auto-fix: detect and return conflicts
        // (mirrors the existing Python stub behavior)
        var conflicts = DetectConflicts(schedule);
        return new GenerateResultDto
        {
            Status = "success",
            Timetable = schedule,
            Conflicts = conflicts
        };
    }

    // ── Scheduling Rules (ported from Python rules.py) ──

    private static bool IsValidAssignment(TimetableSaveEntryDto entry, List<TimetableSaveEntryDto> schedule)
    {
        foreach (var e in schedule)
        {
            if (e.DayId == entry.DayId && e.SlotId == entry.SlotId)
            {
                // Teacher clash
                if (e.TeacherId == entry.TeacherId) return false;
                // Room clash
                if (e.RoomId == entry.RoomId) return false;
                // Class clash
                if (e.ClassId == entry.ClassId) return false;
            }
        }
        return true;
    }

    private static List<ConflictDto> DetectConflicts(List<TimetableSaveEntryDto> schedule)
    {
        var conflicts = new List<ConflictDto>();

        for (int i = 0; i < schedule.Count; i++)
        {
            for (int j = i + 1; j < schedule.Count; j++)
            {
                var a = schedule[i];
                var b = schedule[j];

                if (a.DayId == b.DayId && a.SlotId == b.SlotId)
                {
                    if (a.TeacherId == b.TeacherId)
                        conflicts.Add(new ConflictDto { Entry1 = a, Entry2 = b, ConflictType = "Teacher conflict" });

                    if (a.RoomId == b.RoomId)
                        conflicts.Add(new ConflictDto { Entry1 = a, Entry2 = b, ConflictType = "Room conflict" });

                    if (a.ClassId == b.ClassId)
                        conflicts.Add(new ConflictDto { Entry1 = a, Entry2 = b, ConflictType = "Class conflict" });
                }
            }
        }

        return conflicts;
    }
}
