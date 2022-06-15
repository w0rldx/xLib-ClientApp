namespace xLib.Application.Common.Interfaces;

using Models;
using xLib.Application.User.ViewModel;

public interface IUserService
{
    Task<string> RegisterAsync(RegisterModel model);
    Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model);
    Task<string> AddRoleAsync(AddRoleModel model);
    Task<UserModel> GetUserAsync(string email);
}