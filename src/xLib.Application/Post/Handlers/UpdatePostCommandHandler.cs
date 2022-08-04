using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Exceptions;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.Exceptions;
using xLib.Application.Post.ViewModels;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.Post.Handlers;

public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, PostViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public UpdatePostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager,
        IApplicationDbContext context)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _context = context;
    }

    public async Task<PostViewModel> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var post = _context.Posts.SingleOrDefault(x => x.Id.Equals(request.Id));

        if (post == null)
        {
            throw new EntityNotFoundException();
        }

        if (post.CreatedByUserId != user.Id)
        {
            throw new ForbiddenAccessException();
        }

        post.Message = request.Message;

        var result = _context.Posts.Update(post);
        await _context.SaveChangesAsync(cancellationToken);

        return new PostViewModel()
        {
            Id = result.Entity.Id,
            Message = result.Entity.Message,
            CreatedDate = result.Entity.Created
        };
    }
}