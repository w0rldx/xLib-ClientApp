using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Exceptions;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.Exceptions;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.Post.Handlers;

public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
{

    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public DeletePostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _context = context;
    }

    public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var post = _context.Posts.SingleOrDefault(x => x.Id.Equals(request.Id));

        if (post == null)
        {
            throw new EntityNotFoundException();
        }
        
        if (!post.CreatedByUserId.Equals(user.Id))
        {
            throw new CantDeletePostFromOtherUserException();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}