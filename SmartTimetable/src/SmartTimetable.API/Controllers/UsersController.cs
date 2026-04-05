using Microsoft.AspNetCore.Mvc;
using SmartTimetable.Core.DTOs;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;

namespace SmartTimetable.API.Controllers;

[ApiController]
[Route("users")]
public class UsersController : ControllerBase
{
    private readonly IRepository<User> _repo;

    public UsersController(IRepository<User> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _repo.GetAllAsync();
        var result = items.Select(u => new UserResponseDto
        {
            Id = u.Id, Name = u.Name, Email = u.Email, Role = u.Role
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "User not found" });
        return Ok(new UserResponseDto
        {
            Id = item.Id, Name = item.Name, Email = item.Email, Role = item.Role
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateDto dto)
    {
        var entity = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = dto.Role
        };
        await _repo.AddAsync(entity);
        return CreatedAtAction(nameof(GetById), new { id = entity.Id },
            new UserResponseDto
            {
                Id = entity.Id, Name = entity.Name, Email = entity.Email, Role = entity.Role
            });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDto dto)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "User not found" });

        item.Name = dto.Name;
        item.Role = dto.Role;
        await _repo.UpdateAsync(item);
        return Ok(new UserResponseDto
        {
            Id = item.Id, Name = item.Name, Email = item.Email, Role = item.Role
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if (item == null) return NotFound(new { detail = "User not found" });
        await _repo.DeleteAsync(item);
        return Ok(new { detail = "User deleted" });
    }
}
