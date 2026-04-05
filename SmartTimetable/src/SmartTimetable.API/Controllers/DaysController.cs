using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("days")]
public class DaysController : ControllerBase
{
    private readonly IRepository<Day> _repo;

    public DaysController(IRepository<Day> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(d => new DayResponseDto { Id = d.Id, Name = d.Name });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Day not found" });
        return Ok(new DayResponseDto { Id = item.Id, Name = item.Name });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] DayCreateDto dto)
    {
        var entity = new Day { Name = dto.Name };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new DayResponseDto { Id = entity.Id, Name = entity.Name });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] DayCreateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Day not found" });
        item.Name = dto.Name;
        await _repo.UpdateAsync(item);
        return Ok(new DayResponseDto { Id = item.Id, Name = item.Name });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Day not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Day deleted" });
    }
}
