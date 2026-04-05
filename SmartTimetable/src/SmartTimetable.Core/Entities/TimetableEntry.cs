using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("timetable_entries")]
public class TimetableEntry
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("timetable_id")]
    public int? TimetableId { get; set; }

    [Column("class_id")]
    public int? ClassId { get; set; }

    [Column("subject_id")]
    public int? SubjectId { get; set; }

    [Column("teacher_id")]
    public int? TeacherId { get; set; }

    [Column("room_id")]
    public int? RoomId { get; set; }

    [Column("day_id")]
    public int? DayId { get; set; }

    [Column("time_slot_id")]
    public int? TimeSlotId { get; set; }

    // Navigation properties
    [ForeignKey("TimetableId")]
    public Timetable? Timetable { get; set; }

    [ForeignKey("ClassId")]
    public Class? Class { get; set; }

    [ForeignKey("SubjectId")]
    public Subject? Subject { get; set; }

    [ForeignKey("TeacherId")]
    public Teacher? Teacher { get; set; }

    [ForeignKey("RoomId")]
    public Room? Room { get; set; }

    [ForeignKey("DayId")]
    public Day? Day { get; set; }

    [ForeignKey("TimeSlotId")]
    public TimeSlot? TimeSlot { get; set; }
}
