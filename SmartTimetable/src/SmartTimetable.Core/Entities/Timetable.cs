using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("timetables")]
public class Timetable
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("teacher_id")]
    public int TeacherId { get; set; }

    [Required]
    [Column("subject_id")]
    public int SubjectId { get; set; }

    [Required]
    [Column("class_id")]
    public int ClassId { get; set; }

    [Required]
    [Column("room_id")]
    public int RoomId { get; set; }

    [Required]
    [Column("day_id")]
    public int DayId { get; set; }

    [Required]
    [Column("slot_id")]
    public int SlotId { get; set; }
}
