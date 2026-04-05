using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("constraints")]
public class ConstraintsController : ControllerBase
{
    private readonly IRepository<Constraint> _repo;

    public ConstraintsController(IRepository<Constraint> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(c => new ConstraintResponseDto
        {
            Id = c.Id, Type = c.Type, Value = c.Value, Description = c.Description
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Constraint not found" });
        return Ok(new ConstraintResponseDto
        {
            Id = item.Id, Type = item.Type, Value = item.Value, Description = item.Description
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ConstraintCreateDto dto)
    {
        var entity = new Constraint
        {
            Type = dto.Type, Value = dto.Value, Description = dto.Description
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new ConstraintResponseDto
            {
                Id = entity.Id, Type = entity.Type, Value = entity.Value, Description = entity.Description
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ConstraintUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Constraint not found" });

        item.Type = dto.Type;
        item.Value = dto.Value;
        item.Description = dto.Description;
        await _repo.UpdateAsync(item);
        return Ok(new ConstraintResponseDto
        {
            Id = item.Id, Type = item.Type, Value = item.Value, Description = item.Description
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Constraint not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Constraint deleted" });
    }
}
