using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("time-slots")]
public class TimeSlotsController : ControllerBase
{
    private readonly IRepository<TimeSlot> _repo;

    public TimeSlotsController(IRepository<TimeSlot> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(ts => new TimeSlotResponseDto
        {
            Id = ts.Id,
            StartTime = ts.StartTime.ToString(@"hh\:mm\:ss"),
            EndTime = ts.EndTime.ToString(@"hh\:mm\:ss"),
            SlotOrder = ts.SlotOrder
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Time slot not found" });
        return Ok(new TimeSlotResponseDto
        {
            Id = item.Id,
            StartTime = item.StartTime.ToString(@"hh\:mm\:ss"),
            EndTime = item.EndTime.ToString(@"hh\:mm\:ss"),
            SlotOrder = item.SlotOrder
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TimeSlotCreateDto dto)
    {
        var entity = new TimeSlot
        {
            StartTime = TimeSpan.Parse(dto.StartTime),
            EndTime = TimeSpan.Parse(dto.EndTime),
            SlotOrder = dto.SlotOrder
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new TimeSlotResponseDto
            {
                Id = entity.Id,
                StartTime = entity.StartTime.ToString(@"hh\:mm\:ss"),
                EndTime = entity.EndTime.ToString(@"hh\:mm\:ss"),
                SlotOrder = entity.SlotOrder
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TimeSlotUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Time slot not found" });

        item.StartTime = TimeSpan.Parse(dto.StartTime);
        item.EndTime = TimeSpan.Parse(dto.EndTime);
        item.SlotOrder = dto.SlotOrder;
        await _repo.UpdateAsync(item);
        return Ok(new TimeSlotResponseDto
        {
            Id = item.Id,
            StartTime = item.StartTime.ToString(@"hh\:mm\:ss"),
            EndTime = item.EndTime.ToString(@"hh\:mm\:ss"),
            SlotOrder = item.SlotOrder
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Time slot not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Time slot deleted" });
    }
}
