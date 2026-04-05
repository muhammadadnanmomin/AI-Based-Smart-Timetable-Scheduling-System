using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("time_slots")]
public class TimeSlot
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("start_time")]
    public TimeSpan StartTime { get; set; }

    [Required]
    [Column("end_time")]
    public TimeSpan EndTime { get; set; }

    [Required]
    [Column("slot_order")]
    public int SlotOrder { get; set; }
}
