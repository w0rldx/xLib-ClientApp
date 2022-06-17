namespace xLib.Application.User.Interfaces;

using Common.Models;
using xLib.Application.User.ViewModel;

public interface IUserService
{
    Task<AuthenticationModel> RegisterAsync(RegisterModel model);
    Task<AuthenticationModel> GetTokenAsync(LoginModel model);
    Task<string> AddRoleAsync(AddRoleModel model);
    Task<UserModel> GetUserDetailsAsync();
}