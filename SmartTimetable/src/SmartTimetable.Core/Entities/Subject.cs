using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("subjects")]
public class Subject
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(20)]
    [Column("code")]
    public string? Code { get; set; }

    [Required]
    [Column("weekly_lectures")]
    public int WeeklyLectures { get; set; }

    [Column("is_lab")]
    public bool? IsLab { get; set; }

    [Column("lab_duration")]
    public int? LabDuration { get; set; }
}
