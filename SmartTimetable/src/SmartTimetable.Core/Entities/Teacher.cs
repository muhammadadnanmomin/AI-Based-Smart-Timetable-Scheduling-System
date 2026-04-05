using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("teachers")]
public class Teacher
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("user_id")]
    public int? UserId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("department")]
    public string? Department { get; set; }

    [Column("max_lectures_per_day")]
    public int? MaxLecturesPerDay { get; set; }

    // Navigation
    [ForeignKey("UserId")]
    public User? User { get; set; }
}
