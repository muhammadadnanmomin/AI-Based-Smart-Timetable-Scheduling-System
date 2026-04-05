using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("subjects")]
public class SubjectsController : ControllerBase
{
    private readonly IRepository<Subject> _repo;

    public SubjectsController(IRepository<Subject> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(s => new SubjectResponseDto
        {
            Id = s.Id, Name = s.Name, Code = s.Code,
            WeeklyLectures = s.WeeklyLectures, IsLab = s.IsLab, LabDuration = s.LabDuration
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Subject not found" });
        return Ok(new SubjectResponseDto
        {
            Id = item.Id, Name = item.Name, Code = item.Code,
            WeeklyLectures = item.WeeklyLectures, IsLab = item.IsLab, LabDuration = item.LabDuration
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SubjectCreateDto dto)
    {
        var entity = new Subject
        {
            Name = dto.Name, Code = dto.Code,
            WeeklyLectures = dto.WeeklyLectures, IsLab = dto.IsLab, LabDuration = dto.LabDuration
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new SubjectResponseDto
            {
                Id = entity.Id, Name = entity.Name, Code = entity.Code,
                WeeklyLectures = entity.WeeklyLectures, IsLab = entity.IsLab, LabDuration = entity.LabDuration
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] SubjectUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Subject not found" });

        item.Name = dto.Name;
        item.Code = dto.Code;
        item.WeeklyLectures = dto.WeeklyLectures;
        item.IsLab = dto.IsLab;
        item.LabDuration = dto.LabDuration;
        await _repo.UpdateAsync(item);
        return Ok(new SubjectResponseDto
        {
            Id = item.Id, Name = item.Name, Code = item.Code,
            WeeklyLectures = item.WeeklyLectures, IsLab = item.IsLab, LabDuration = item.LabDuration
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "Subject not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "Subject deleted" });
    }
}
