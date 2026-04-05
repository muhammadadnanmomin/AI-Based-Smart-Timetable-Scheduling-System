using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("days")]
public class Day
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column("name")]
    public string? Name { get; set; }
}
