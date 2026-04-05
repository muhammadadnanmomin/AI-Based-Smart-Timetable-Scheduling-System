using SmartTimetable.Core.DTOs.Auth;

namespace SmartTimetable.Core.Interfaces;

public interface IAuthService
{
    Task<TokenResponse> SignupAsync(SignupRequest request);
    Task<TokenResponse> LoginAsync(LoginRequest request);
    Task<UserMeResponse?> GetCurrentUserAsync(int userId);
}
