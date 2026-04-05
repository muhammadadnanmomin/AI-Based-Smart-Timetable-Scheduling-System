using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("rooms")]
public class Room
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("capacity")]
    public int? Capacity { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("type")]
    public string Type { get; set; } = "lecture";

    [MaxLength(100)]
    [Column("building")]
    public string? Building { get; set; }
}
