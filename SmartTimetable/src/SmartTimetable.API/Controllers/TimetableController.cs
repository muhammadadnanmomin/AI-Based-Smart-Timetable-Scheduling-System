using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
public class TimetableController : ControllerBase
{
    private readonly ITimetableService _timetableService;

    public TimetableController(ITimetableService timetableService)
    {
        _timetableService = timetableService;
    }

    [HttpPost("generate-timetable")]
    public async Task<IActionResult> Generate()
    {
        var result = await _timetableService.GenerateTimetableAsync();
        return Ok(result);
    }

    [HttpPost("auto-fix")]
    public IActionResult AutoFix([FromBody] AutoFixRequest request)
    {
        var result = _timetableService.AutoFixConflicts(request);
        return Ok(result);
    }

    [HttpGet("timetable/load")]
    public async Task<IActionResult> LoadTimetable()
    {
        var result = await _timetableService.LoadTimetableAsync();
        return Ok(result);
    }

    [HttpPost("timetable/save")]
    public async Task<IActionResult> SaveTimetable([FromBody] List<TimetableSaveEntryDto> entries)
    {
        await _timetableService.SaveTimetableAsync(entries);
        return Ok(new { status = "saved" });
    }
}
