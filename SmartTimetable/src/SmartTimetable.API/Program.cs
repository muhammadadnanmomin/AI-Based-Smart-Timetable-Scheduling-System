using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SmartTimetable.API.Middleware;
using SmartTimetable.Core.Entities;
using SmartTimetable.Core.Interfaces;
using SmartTimetable.Infrastructure.Data;
using SmartTimetable.Infrastructure.Repositories;
using SmartTimetable.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// ── JSON serialization (camelCase to match frontend expectations) ──
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
    });

// ── MySQL Database (Pomelo) ──
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ── Dependency Injection ──
// Repositories (generic for all entities)
builder.Services.AddScoped<IRepository<User>, Repository<User>>();
builder.Services.AddScoped<IRepository<Teacher>, Repository<Teacher>>();
builder.Services.AddScoped<IRepository<Subject>, Repository<Subject>>();
builder.Services.AddScoped<IRepository<Class>, Repository<Class>>();
builder.Services.AddScoped<IRepository<Room>, Repository<Room>>();
builder.Services.AddScoped<IRepository<Day>, Repository<Day>>();
builder.Services.AddScoped<IRepository<TimeSlot>, Repository<TimeSlot>>();
builder.Services.AddScoped<IRepository<TeacherSubject>, Repository<TeacherSubject>>();
builder.Services.AddScoped<IRepository<TeacherPreference>, Repository<TeacherPreference>>();
builder.Services.AddScoped<IRepository<Constraint>, Repository<Constraint>>();
builder.Services.AddScoped<IRepository<Timetable>, Repository<Timetable>>();
builder.Services.AddScoped<IRepository<TimetableEntry>, Repository<TimetableEntry>>();

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITimetableService, TimetableService>();

// ── JWT Authentication ──
var jwtKey = builder.Configuration["Jwt:SecretKey"] ?? "fallback-secret-change-in-production";
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

// ── CORS (allow React frontend) ──
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// ── Swagger ──
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Smart Timetable System API",
        Version = "v1",
        Description = "ASP.NET Web API for AI-Based Smart Timetable Scheduling System"
    });

    // JWT auth in Swagger UI
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ── Middleware Pipeline ──
app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// ── Root endpoint ──
app.MapGet("/", () => new { message = "ASP.NET + MySQL connected successfully!" });

app.Run();
