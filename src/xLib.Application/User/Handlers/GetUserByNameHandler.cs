using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace xLib.Application.User.Handlers;

using MediatR;
using Microsoft.AspNetCore.Identity;
using Queries;
using ViewModels;
using xLib.Application.Common.Interfaces;
using xLib.Application.User.Exceptions;
using xLib.Infastructure.Identity.Models;

public class GetUserByNameHandler : IRequestHandler<GetUserByNameQuery, UserViewModel>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetUserByNameHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<UserViewModel> Handle(GetUserByNameQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var searchUser = await _userManager.FindByIdAsync(userId);

        List<string> roles = new List<string>();
        var user = await _userManager.FindByNameAsync(request.Username);
        

        if (user == null)
        {
            throw new UserNotFoundException();
        }

        if (user.Private && searchUser.Id != user.Id)
        {
            throw new UserHavePrivateProfileException();
        }

        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

        if (rolesList.Contains("Administrator"))
        {
            roles.Add("Admin");
        }
        else if (rolesList.Contains("Moderator"))
        {
            roles.Add("Moderator");
        }
        else if (rolesList.Contains("Pro"))
        {
            roles.Add("Pro");
        }

        var result = new UserViewModel
        {
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Avatar = user.AvatarPictureUrl,
            HeaderPicture = user.HeaderPictureUrl,
            Roles = roles,
        };

        return result;
    }
}
