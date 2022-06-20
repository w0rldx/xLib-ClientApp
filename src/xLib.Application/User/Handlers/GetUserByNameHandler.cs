namespace xLib.Application.User.Handlers;

using Exceptions;
using Identity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Queries;
using ViewModels;

public class GetUserByNameHandler : IRequestHandler<GetUserByNameQuery, UserViewModel>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public GetUserByNameHandler(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<UserViewModel> Handle(GetUserByNameQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Username);

        if (user == null)
        {
            throw new UserNotFoundException();
        }

        if (user.Private)
        {
            throw new UserHavePrivateProfileException();
        }

        UserViewModel result = new UserViewModel
        {
            Username = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            ProfilePicture = user.ProfilePicture
        };

        return result;
    }
}
