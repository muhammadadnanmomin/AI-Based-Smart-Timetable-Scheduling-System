using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("classes")]
public class Class
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("department")]
    public string? Department { get; set; }

    [Column("semester")]
    public int? Semester { get; set; }

    [Column("total_students")]
    public int? TotalStudents { get; set; }
}
