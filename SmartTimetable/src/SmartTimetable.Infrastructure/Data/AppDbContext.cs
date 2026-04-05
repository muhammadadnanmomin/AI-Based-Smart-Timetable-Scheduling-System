using Microsoft.EntityFrameworkCore;
using SmartTimetable.Core.Entities;

namespace SmartTimetable.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Teacher> Teachers => Set<Teacher>();
    public DbSet<Subject> Subjects => Set<Subject>();
    public DbSet<Class> Classes => Set<Class>();
    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<Day> Days => Set<Day>();
    public DbSet<TimeSlot> TimeSlots => Set<TimeSlot>();
    public DbSet<TeacherSubject> TeacherSubjects => Set<TeacherSubject>();
    public DbSet<TeacherPreference> TeacherPreferences => Set<TeacherPreference>();
    public DbSet<Constraint> Constraints => Set<Constraint>();
    public DbSet<Timetable> Timetables => Set<Timetable>();
    public DbSet<TimetableEntry> TimetableEntries => Set<TimetableEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── User ──
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Id);
        });

        // ── Teacher ──
        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasIndex(e => e.UserId).IsUnique();
            entity.HasIndex(e => e.Id);
            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ── Subject ──
        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasIndex(e => e.Code).IsUnique();
            entity.HasIndex(e => e.Id);
        });

        // ── Class ──
        modelBuilder.Entity<Class>(entity =>
        {
            entity.HasIndex(e => e.Id);
        });

        // ── Room ──
        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasIndex(e => e.Name).IsUnique();
            entity.HasIndex(e => e.Id);
        });

        // ── Day ──
        modelBuilder.Entity<Day>(entity =>
        {
            entity.HasIndex(e => e.Name).IsUnique();
            entity.HasIndex(e => e.Id);
        });

        // ── TimeSlot ──
        modelBuilder.Entity<TimeSlot>(entity =>
        {
            entity.HasIndex(e => e.Id);
        });

        // ── TeacherSubject ──
        modelBuilder.Entity<TeacherSubject>(entity =>
        {
            entity.HasIndex(e => new { e.TeacherId, e.SubjectId, e.ClassId })
                  .IsUnique()
                  .HasDatabaseName("uq_teacher_subject_class");
            entity.HasIndex(e => e.Id);
            entity.HasOne(e => e.Teacher).WithMany().HasForeignKey(e => e.TeacherId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Subject).WithMany().HasForeignKey(e => e.SubjectId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Class).WithMany().HasForeignKey(e => e.ClassId).OnDelete(DeleteBehavior.Cascade);
        });

        // ── TeacherPreference ──
        modelBuilder.Entity<TeacherPreference>(entity =>
        {
            entity.HasIndex(e => e.Id);
            entity.HasOne(e => e.Teacher).WithMany().HasForeignKey(e => e.TeacherId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.PreferredDay).WithMany().HasForeignKey(e => e.PreferredDayId).OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.PreferredSlot).WithMany().HasForeignKey(e => e.PreferredSlotId).OnDelete(DeleteBehavior.SetNull);
        });

        // ── Constraint ──
        modelBuilder.Entity<Constraint>(entity =>
        {
            entity.HasIndex(e => e.Id);
        });

        // ── Timetable ──
        modelBuilder.Entity<Timetable>(entity =>
        {
            entity.HasIndex(e => e.Id);
        });

        // ── TimetableEntry ──
        modelBuilder.Entity<TimetableEntry>(entity =>
        {
            entity.HasIndex(e => e.Id);
            entity.HasIndex(e => new { e.TeacherId, e.DayId, e.TimeSlotId })
                  .IsUnique().HasDatabaseName("uq_teacher_slot");
            entity.HasIndex(e => new { e.RoomId, e.DayId, e.TimeSlotId })
                  .IsUnique().HasDatabaseName("uq_room_slot");
            entity.HasIndex(e => new { e.ClassId, e.DayId, e.TimeSlotId })
                  .IsUnique().HasDatabaseName("uq_class_slot");
            entity.HasOne(e => e.Timetable).WithMany().HasForeignKey(e => e.TimetableId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Class).WithMany().HasForeignKey(e => e.ClassId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Subject).WithMany().HasForeignKey(e => e.SubjectId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Teacher).WithMany().HasForeignKey(e => e.TeacherId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Room).WithMany().HasForeignKey(e => e.RoomId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Day).WithMany().HasForeignKey(e => e.DayId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.TimeSlot).WithMany().HasForeignKey(e => e.TimeSlotId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}
