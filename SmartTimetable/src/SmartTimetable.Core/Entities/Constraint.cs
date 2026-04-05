using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("constraints")]
public class Constraint
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("type")]
    public string Type { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("value")]
    public string Value { get; set; } = string.Empty;

    [Column("description")]
    public string? Description { get; set; }
}
