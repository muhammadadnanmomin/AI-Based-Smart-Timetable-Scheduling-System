using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("teachers")]
public class TeachersController : ControllerBase
{
    private readonly IRepository<Teacher> _repo;

    public TeachersController(IRepository<Teacher> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(t => new TeacherResponseDto
        {
            Id = t.Id, UserId = t.UserId, Name = t.Name,
            Department = t.Department, MaxLecturesPerDay = t.MaxLecturesPerDay
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Teacher not found" });
        return Ok(new TeacherResponseDto
        {
            Id = item.Id, UserId = item.UserId, Name = item.Name,
            Department = item.Department, MaxLecturesPerDay = item.MaxLecturesPerDay
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TeacherCreateDto dto)
    {
        var entity = new Teacher
        {
            UserId = dto.UserId, Name = dto.Name,
            Department = dto.Department, MaxLecturesPerDay = dto.MaxLecturesPerDay
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new TeacherResponseDto
            {
                Id = entity.Id, UserId = entity.UserId, Name = entity.Name,
                Department = entity.Department, MaxLecturesPerDay = entity.MaxLecturesPerDay
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TeacherUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Teacher not found" });

        item.Name = dto.Name;
        item.Department = dto.Department;
        item.MaxLecturesPerDay = dto.MaxLecturesPerDay;
        await _repo.UpdateAsync(item);
        return Ok(new TeacherResponseDto
        {
            Id = item.Id, UserId = item.UserId, Name = item.Name,
            Department = item.Department, MaxLecturesPerDay = item.MaxLecturesPerDay
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Teacher not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Teacher deleted" });
    }
}
