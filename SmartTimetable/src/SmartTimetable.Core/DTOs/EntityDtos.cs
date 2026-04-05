namespace SmartTimetable.Core.DTOs;

// ── Teacher DTOs ──
public class TeacherCreateDto
{
    public int? UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? MaxLecturesPerDay { get; set; }
}

public class TeacherUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? MaxLecturesPerDay { get; set; }
}

public class TeacherResponseDto
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? MaxLecturesPerDay { get; set; }
}

// ── Subject DTOs ──
public class SubjectCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Code { get; set; }
    public int WeeklyLectures { get; set; }
    public bool? IsLab { get; set; }
    public int? LabDuration { get; set; }
}

public class SubjectUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Code { get; set; }
    public int WeeklyLectures { get; set; }
    public bool? IsLab { get; set; }
    public int? LabDuration { get; set; }
}

public class SubjectResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Code { get; set; }
    public int WeeklyLectures { get; set; }
    public bool? IsLab { get; set; }
    public int? LabDuration { get; set; }
}

// ── Class DTOs ──
public class ClassCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? Semester { get; set; }
    public int? TotalStudents { get; set; }
}

public class ClassUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? Semester { get; set; }
    public int? TotalStudents { get; set; }
}

public class ClassResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Department { get; set; }
    public int? Semester { get; set; }
    public int? TotalStudents { get; set; }
}

// ── Room DTOs ──
public class RoomCreateDto
{
    public string Name { get; set; } = string.Empty;
    public int? Capacity { get; set; }
    public string Type { get; set; } = "lecture";
    public string? Building { get; set; }
}

public class RoomUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public int? Capacity { get; set; }
    public string Type { get; set; } = "lecture";
    public string? Building { get; set; }
}

public class RoomResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int? Capacity { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? Building { get; set; }
}

// ── Day DTOs ──
public class DayCreateDto
{
    public string Name { get; set; } = string.Empty;
}

public class DayResponseDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
}

// ── TimeSlot DTOs ──
public class TimeSlotCreateDto
{
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int SlotOrder { get; set; }
}

public class TimeSlotUpdateDto
{
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int SlotOrder { get; set; }
}

public class TimeSlotResponseDto
{
    public int Id { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int SlotOrder { get; set; }
}

// ── Constraint DTOs ──
public class ConstraintCreateDto
{
    public string Type { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class ConstraintUpdateDto
{
    public string Type { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class ConstraintResponseDto
{
    public int Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
}

// ── Preference DTOs ──
public class PreferenceCreateDto
{
    public int TeacherId { get; set; }
    public int? PreferredDayId { get; set; }
    public int? PreferredSlotId { get; set; }
    public int? Priority { get; set; }
}

public class PreferenceUpdateDto
{
    public int TeacherId { get; set; }
    public int? PreferredDayId { get; set; }
    public int? PreferredSlotId { get; set; }
    public int? Priority { get; set; }
}

public class PreferenceResponseDto
{
    public int Id { get; set; }
    public int? TeacherId { get; set; }
    public int? PreferredDayId { get; set; }
    public int? PreferredSlotId { get; set; }
    public int? Priority { get; set; }
}

// ── User CRUD DTOs ──
public class UserCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "admin";
}

public class UserUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public class UserResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

// ── Timetable DTOs ──
public class TimetableEntryDto
{
    public int Id { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Teacher { get; set; } = string.Empty;
    public string Room { get; set; } = string.Empty;
    public string ClassName { get; set; } = string.Empty;
    public string Day { get; set; } = string.Empty;
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int DayId { get; set; }
    public int SlotId { get; set; }
    public int SubjectId { get; set; }
    public int TeacherId { get; set; }
    public int RoomId { get; set; }
    public int ClassId { get; set; }
}

public class TimetableSaveEntryDto
{
    public int TeacherId { get; set; }
    public int SubjectId { get; set; }
    public int ClassId { get; set; }
    public int RoomId { get; set; }
    public int DayId { get; set; }
    public int SlotId { get; set; }
}

public class GenerateResultDto
{
    public string Status { get; set; } = string.Empty;
    public string? Message { get; set; }
    public List<TimetableSaveEntryDto>? Timetable { get; set; }
    public List<ConflictDto>? Conflicts { get; set; }
}

public class ConflictDto
{
    public TimetableSaveEntryDto Entry1 { get; set; } = new();
    public TimetableSaveEntryDto Entry2 { get; set; } = new();
    public string ConflictType { get; set; } = string.Empty;
}

public class AutoFixRequest
{
    public List<TimetableSaveEntryDto> Timetable { get; set; } = new();
}
