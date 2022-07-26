using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Exceptions;
using xLib.Application.User.Command;
using xLib.Application.User.Exceptions;
using xLib.Application.User.Queries;
using xLib.Application.User.ViewModels;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.User.Handlers;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;

    public UpdateUserCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
    }

    public async Task<UserViewModel> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var userNameCheck = await _userManager.FindByNameAsync(request.UserName);
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            throw new EntityNotFoundException();
        }

        if (userNameCheck != null && userNameCheck.Id != user.Id)
        {
            throw new UsernameAlreadyExistException();
        }

        user.Private = request.Private;
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.UserName = request.UserName;

        if (request.Avatar != null)
        {
            user.AvatarPictureUrl = request.Avatar.Blob.Uri;
        }

        if (request.HeaderPicture != null)
        {
            user.HeaderPictureUrl = request.HeaderPicture.Blob.Uri;
        }

        await _userManager.UpdateAsync(user);
        var updatedUser = await _userManager.FindByIdAsync(userId);
        var rolesList = await _userManager.GetRolesAsync(updatedUser).ConfigureAwait(false);

        return new UserViewModel()
        {
            FirstName = updatedUser.FirstName,
            LastName = updatedUser.LastName,
            UserName = updatedUser.UserName,
            HeaderPicture = updatedUser.HeaderPictureUrl,
            Avatar = updatedUser.AvatarPictureUrl,
            Email = updatedUser.Email,
            Roles = rolesList.ToList()
        };
    }
}
