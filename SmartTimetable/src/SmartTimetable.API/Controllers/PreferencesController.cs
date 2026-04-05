using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("teacher-preferences")]
public class PreferencesController : ControllerBase
{
    private readonly IRepository<TeacherPreference> _repo;

    public PreferencesController(IRepository<TeacherPreference> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(p => new PreferenceResponseDto
        {
            Id = p.Id, TeacherId = p.TeacherId,
            PreferredDayId = p.PreferredDayId, PreferredSlotId = p.PreferredSlotId,
            Priority = p.Priority
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Preference not found" });
        return Ok(new PreferenceResponseDto
        {
            Id = item.Id, TeacherId = item.TeacherId,
            PreferredDayId = item.PreferredDayId, PreferredSlotId = item.PreferredSlotId,
            Priority = item.Priority
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] PreferenceCreateDto dto)
    {
        var entity = new TeacherPreference
        {
            TeacherId = dto.TeacherId,
            PreferredDayId = dto.PreferredDayId,
            PreferredSlotId = dto.PreferredSlotId,
            Priority = dto.Priority
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new PreferenceResponseDto
            {
                Id = entity.Id, TeacherId = entity.TeacherId,
                PreferredDayId = entity.PreferredDayId, PreferredSlotId = entity.PreferredSlotId,
                Priority = entity.Priority
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] PreferenceUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Preference not found" });

        item.TeacherId = dto.TeacherId;
        item.PreferredDayId = dto.PreferredDayId;
        item.PreferredSlotId = dto.PreferredSlotId;
        item.Priority = dto.Priority;
        await _repo.UpdateAsync(item);
        return Ok(new PreferenceResponseDto
        {
            Id = item.Id, TeacherId = item.TeacherId,
            PreferredDayId = item.PreferredDayId, PreferredSlotId = item.PreferredSlotId,
            Priority = item.Priority
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Preference not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Preference deleted" });
    }
}
