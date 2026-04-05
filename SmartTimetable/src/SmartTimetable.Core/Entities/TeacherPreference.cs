using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("teacher_preferences")]
public class TeacherPreference
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("teacher_id")]
    public int? TeacherId { get; set; }

    [Column("preferred_day_id")]
    public int? PreferredDayId { get; set; }

    [Column("preferred_slot_id")]
    public int? PreferredSlotId { get; set; }

    [Column("priority")]
    public int? Priority { get; set; }

    // Navigation
    [ForeignKey("TeacherId")]
    public Teacher? Teacher { get; set; }

    [ForeignKey("PreferredDayId")]
    public Day? PreferredDay { get; set; }

    [ForeignKey("PreferredSlotId")]
    public TimeSlot? PreferredSlot { get; set; }
}
