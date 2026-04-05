namespace SmartTimetable.AI;

/// <summary>
/// Represents a single schedule entry used within the AI module.
/// </summary>
public class ScheduleEntry
{
    public int TeacherId { get; set; }
    public int SubjectId { get; set; }
    public int ClassId { get; set; }
    public int RoomId { get; set; }
    public int DayId { get; set; }
    public int SlotId { get; set; }
}

/// <summary>
/// Ported from Python rules.py — validates assignments and detects conflicts.
/// </summary>
public static class Rules
{
    public static bool IsValidAssignment(ScheduleEntry entry, List<ScheduleEntry> schedule)
    {
        foreach (var e in schedule)
        {
            if (e.DayId == entry.DayId && e.SlotId == entry.SlotId)
            {
                if (e.TeacherId == entry.TeacherId) return false;
                if (e.RoomId == entry.RoomId) return false;
                if (e.ClassId == entry.ClassId) return false;
            }
        }
        return true;
    }

    public static List<(ScheduleEntry, ScheduleEntry, string)> DetectConflicts(List<ScheduleEntry> schedule)
    {
        var conflicts = new List<(ScheduleEntry, ScheduleEntry, string)>();

        for (int i = 0; i < schedule.Count; i++)
        {
            for (int j = i + 1; j < schedule.Count; j++)
            {
                var a = schedule[i];
                var b = schedule[j];

                if (a.DayId == b.DayId && a.SlotId == b.SlotId)
                {
                    if (a.TeacherId == b.TeacherId)
                        conflicts.Add((a, b, "Teacher conflict"));
                    if (a.RoomId == b.RoomId)
                        conflicts.Add((a, b, "Room conflict"));
                    if (a.ClassId == b.ClassId)
                        conflicts.Add((a, b, "Class conflict"));
                }
            }
        }

        return conflicts;
    }
}

/// <summary>
/// Ported from Python fitness.py — evaluates schedule quality.
/// </summary>
public static class FitnessEvaluator
{
    public static double CalculateFitness(List<ScheduleEntry> schedule, List<PreferenceData> preferences)
    {
        double score = 0;

        // Penalize conflicts
        var conflicts = Rules.DetectConflicts(schedule);
        score -= conflicts.Count * 100;

        // Reward preference satisfaction
        foreach (var pref in preferences)
        {
            foreach (var entry in schedule)
            {
                if (entry.TeacherId == pref.TeacherId)
                {
                    if (pref.PreferredDayId.HasValue && entry.DayId == pref.PreferredDayId)
                        score += pref.Priority * 2;
                    if (pref.PreferredSlotId.HasValue && entry.SlotId == pref.PreferredSlotId)
                        score += pref.Priority * 3;
                }
            }
        }

        return score;
    }
}

/// <summary>
/// Ported from Python crossover.py — single-point crossover operator.
/// </summary>
public static class CrossoverOperator
{
    private static readonly Random _random = new();

    public static List<ScheduleEntry> Crossover(List<ScheduleEntry> parent1, List<ScheduleEntry> parent2)
    {
        if (parent1.Count <= 1) return new List<ScheduleEntry>(parent1);

        int point = _random.Next(1, parent1.Count);
        var child = new List<ScheduleEntry>();
        child.AddRange(parent1.Take(point));
        child.AddRange(parent2.Skip(point));
        return child;
    }
}

/// <summary>
/// Ported from Python mutation.py — random mutation operator.
/// </summary>
public static class MutationOperator
{
    private static readonly Random _random = new();

    public static List<ScheduleEntry> Mutate(
        List<ScheduleEntry> schedule,
        List<int> dayIds,
        List<int> slotIds,
        List<int> roomIds,
        double mutationRate = 0.1)
    {
        for (int i = 0; i < schedule.Count; i++)
        {
            if (_random.NextDouble() < mutationRate)
            {
                schedule[i] = new ScheduleEntry
                {
                    TeacherId = schedule[i].TeacherId,
                    SubjectId = schedule[i].SubjectId,
                    ClassId = schedule[i].ClassId,
                    RoomId = roomIds[_random.Next(roomIds.Count)],
                    DayId = dayIds[_random.Next(dayIds.Count)],
                    SlotId = slotIds[_random.Next(slotIds.Count)]
                };
            }
        }
        return schedule;
    }
}

/// <summary>
/// Ported from Python genetic.py — genetic algorithm runner.
/// </summary>
public static class GeneticAlgorithm
{
    private static readonly Random _random = new();

    public static List<ScheduleEntry> Run(
        ScheduleData data,
        List<PreferenceData> preferences,
        int populationSize = 10,
        int generations = 50)
    {
        var dayIds = data.DayIds;
        var slotIds = data.SlotIds;
        var roomIds = data.RoomIds;

        // Create initial population
        var population = new List<List<ScheduleEntry>>();
        for (int i = 0; i < populationSize; i++)
        {
            population.Add(CreateRandomSchedule(data));
        }

        for (int gen = 0; gen < generations; gen++)
        {
            // Sort by fitness (descending)
            population = population
                .OrderByDescending(s => FitnessEvaluator.CalculateFitness(s, preferences))
                .ToList();

            // Keep top 2 as elites
            var nextGen = new List<List<ScheduleEntry>>
            {
                population[0],
                population[1]
            };

            // Fill rest with crossover + mutation
            while (nextGen.Count < populationSize)
            {
                var parents = population.OrderBy(_ => _random.Next()).Take(2).ToList();
                var child = CrossoverOperator.Crossover(parents[0], parents[1]);
                child = MutationOperator.Mutate(child, dayIds, slotIds, roomIds);
                nextGen.Add(child);
            }

            population = nextGen;
        }

        return population
            .OrderByDescending(s => FitnessEvaluator.CalculateFitness(s, preferences))
            .First();
    }

    private static List<ScheduleEntry> CreateRandomSchedule(ScheduleData data)
    {
        var schedule = new List<ScheduleEntry>();

        foreach (var assignment in data.TeacherSubjectAssignments)
        {
            var entry = new ScheduleEntry
            {
                TeacherId = assignment.TeacherId,
                SubjectId = assignment.SubjectId,
                ClassId = assignment.ClassId,
                RoomId = data.RoomIds[_random.Next(data.RoomIds.Count)],
                DayId = data.DayIds[_random.Next(data.DayIds.Count)],
                SlotId = data.SlotIds[_random.Next(data.SlotIds.Count)]
            };
            schedule.Add(entry);
        }

        return schedule;
    }
}

// ── Data models for the AI module ──

public class ScheduleData
{
    public List<int> DayIds { get; set; } = new();
    public List<int> SlotIds { get; set; } = new();
    public List<int> RoomIds { get; set; } = new();
    public List<TeacherSubjectAssignment> TeacherSubjectAssignments { get; set; } = new();
}

public class TeacherSubjectAssignment
{
    public int TeacherId { get; set; }
    public int SubjectId { get; set; }
    public int ClassId { get; set; }
}

public class PreferenceData
{
    public int TeacherId { get; set; }
    public int? PreferredDayId { get; set; }
    public int? PreferredSlotId { get; set; }
    public int Priority { get; set; }
}
