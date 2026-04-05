using SmartTimetable.Core.DTOs;

namespace SmartTimetable.Core.Interfaces;

public interface ITimetableService
{
    Task<GenerateResultDto> GenerateTimetableAsync();
    Task<List<TimetableEntryDto>> LoadTimetableAsync();
    Task SaveTimetableAsync(List<TimetableSaveEntryDto> entries);
    GenerateResultDto AutoFixConflicts(AutoFixRequest request);
}
