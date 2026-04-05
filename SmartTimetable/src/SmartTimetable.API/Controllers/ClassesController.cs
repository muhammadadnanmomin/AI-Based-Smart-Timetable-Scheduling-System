using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("classes")]
public class ClassesController : ControllerBase
{
    private readonly IRepository<Class> _repo;

    public ClassesController(IRepository<Class> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(c => new ClassResponseDto
        {
            Id = c.Id, Name = c.Name, Department = c.Department,
            Semester = c.Semester, TotalStudents = c.TotalStudents
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Class not found" });
        return Ok(new ClassResponseDto
        {
            Id = item.Id, Name = item.Name, Department = item.Department,
            Semester = item.Semester, TotalStudents = item.TotalStudents
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ClassCreateDto dto)
    {
        var entity = new Class
        {
            Name = dto.Name, Department = dto.Department,
            Semester = dto.Semester, TotalStudents = dto.TotalStudents
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new ClassResponseDto
            {
                Id = entity.Id, Name = entity.Name, Department = entity.Department,
                Semester = entity.Semester, TotalStudents = entity.TotalStudents
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ClassUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Class not found" });

        item.Name = dto.Name;
        item.Department = dto.Department;
        item.Semester = dto.Semester;
        item.TotalStudents = dto.TotalStudents;
        await _repo.UpdateAsync(item);
        return Ok(new ClassResponseDto
        {
            Id = item.Id, Name = item.Name, Department = item.Department,
            Semester = item.Semester, TotalStudents = item.TotalStudents
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Class not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Class deleted" });
    }
}
