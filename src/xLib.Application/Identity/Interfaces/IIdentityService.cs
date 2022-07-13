namespace xLib.Application.Identity.Interfaces;

using Common.Models;
using xLib.Application.Identity.ViewModel;

public interface IIdentityService
{
    Task<AuthenticationModel> RegisterAsync(RegisterModel model);
    Task<AuthenticationModel> GetTokenAsync(LoginModel model);
    Task<string> AddRoleAsync(AddRoleModel model);
    Task<UserModel> GetUserDetailsAsync();
}