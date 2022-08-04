namespace xLib.Application.User.Handlers;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using xLib.Application.Common.Models;
using xLib.Application.User.Queries;
using xLib.Infastructure.Identity.Models;

public class GetUserDetailsHandler : IRequestHandler<GetUserDetailsQuery, ApplicationUserViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUserDetailsHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<ApplicationUserViewModel> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");

        var user = await _userManager.FindByIdAsync(userId);
        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);

        var userVm = new ApplicationUserViewModel
        {
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            UserName = user.UserName,
            Private = user.Private,
            Roles = rolesList.ToArray(),
            HeaderPicture = user.HeaderPictureUrl,
            AvatarPicture = user.AvatarPictureUrl
        };

        return userVm;
    }
}