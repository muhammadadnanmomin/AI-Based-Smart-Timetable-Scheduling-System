using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartTimetable.Core.Entities;

[Table("teacher_subjects")]
public class TeacherSubject
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("teacher_id")]
    public int? TeacherId { get; set; }

    [Column("subject_id")]
    public int? SubjectId { get; set; }

    [Column("class_id")]
    public int? ClassId { get; set; }

    // Navigation
    [ForeignKey("TeacherId")]
    public Teacher? Teacher { get; set; }

    [ForeignKey("SubjectId")]
    public Subject? Subject { get; set; }

    [ForeignKey("ClassId")]
    public Class? Class { get; set; }
}
