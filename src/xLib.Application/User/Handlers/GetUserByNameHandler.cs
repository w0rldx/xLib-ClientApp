namespace xLib.Application.User.Handlers;

using MediatR;
using Queries;
using ViewModels;
using xLib.Application.Common.Interfaces;

public class GetUserByNameHandler : IRequestHandler<GetUserByNameQuery, UserViewModel>
{
    private readonly IApplicationDbContext _context;

    public GetUserByNameHandler(IApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<UserViewModel> Handle(GetUserByNameQuery request, CancellationToken cancellationToken)
    {
        //var user = new Appl

        //if (user == null)
        //{
        //    throw new UserNotFoundException();
        //}

        //if (user.Private)
        //{
        //    throw new UserHavePrivateProfileException();
        //}

        //UserViewModel result = new UserViewModel
        //{
        //    UserName = user.UserName,
        //    Email = user.Email,
        //    FirstName = user.FirstName,
        //    LastName = user.LastName,
        //    Avatar = user.AvatarPictureUrl,
        //    HeaderPicture = user.HeaderPictureUrl,
        //};

        //return result;

        return null;
    }
}
