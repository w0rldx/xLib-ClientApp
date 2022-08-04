using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using xLib.Application.Common.Exceptions;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Exceptions;
using xLib.Application.Post.Queries;
using xLib.Application.Post.ViewModels;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.Post.Handlers;

public class GetSpecificPostFromIdQueryHandler : IRequestHandler<GetSpecificPostFromIdQuery, PostViewModel>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public GetSpecificPostFromIdQueryHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<PostViewModel> Handle(GetSpecificPostFromIdQuery request, CancellationToken cancellationToken)
    {
        var post = _context.Posts.SingleOrDefault(x => x.Id.Equals(request.Id));

        if (post == null)
        {
            throw new EntityNotFoundException();
        }

        var user = await _userManager.FindByIdAsync(post.CreatedByUserId);

        if (user == null || user.Private)
        {
            throw new ForbiddenAccessException();
        }

        return new PostViewModel()
        {
            Id = post.Id,
            Message = post.Message,
            CreatedDate = post.Created
        };
    }
}