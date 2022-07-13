namespace xLib.Application.Identity.Interfaces;

using xLib.Application.Common.Models;

public interface IIdentityService
{
    Task<AuthenticationViewModel> RegisterAsync(RegisterViewModel model);
    Task<AuthenticationViewModel> GetTokenAsync(LoginViewModel model);
    Task<string> AddRoleAsync(AddRoleViewModel model);
}