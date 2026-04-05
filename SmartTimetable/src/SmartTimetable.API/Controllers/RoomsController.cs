using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("rooms")]
public class RoomsController : ControllerBase
{
    private readonly IRepository<Room> _repo;

    public RoomsController(IRepository<Room> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(r => new RoomResponseDto
        {
            Id = r.Id, Name = r.Name, Capacity = r.Capacity,
            Type = r.Type, Building = r.Building
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Room not found" });
        return Ok(new RoomResponseDto
        {
            Id = item.Id, Name = item.Name, Capacity = item.Capacity,
            Type = item.Type, Building = item.Building
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] RoomCreateDto dto)
    {
        var entity = new Room
        {
            Name = dto.Name, Capacity = dto.Capacity,
            Type = dto.Type, Building = dto.Building
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new RoomResponseDto
            {
                Id = entity.Id, Name = entity.Name, Capacity = entity.Capacity,
                Type = entity.Type, Building = entity.Building
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] RoomUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Room not found" });

        item.Name = dto.Name;
        item.Capacity = dto.Capacity;
        item.Type = dto.Type;
        item.Building = dto.Building;
        await _repo.UpdateAsync(item);
        return Ok(new RoomResponseDto
        {
            Id = item.Id, Name = item.Name, Capacity = item.Capacity,
            Type = item.Type, Building = item.Building
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Room not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Room deleted" });
    }
}
