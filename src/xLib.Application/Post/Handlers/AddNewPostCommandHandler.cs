using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.ViewModels;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.Post.Handlers;

public class AddNewPostCommandHandler : IRequestHandler<AddNewPostCommand, PostViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;

    public AddNewPostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IApplicationDbContext context)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _context = context;
    }

    public async Task<PostViewModel> Handle(AddNewPostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var result = _context.Posts.Add(new Domain.Entities.Post
        {
            Created = DateTime.UtcNow,
            Message = request.Message,
            CreatedByUserId = user.Id
        });

        await _context.SaveChangesAsync(cancellationToken);

        return new PostViewModel()
        {
            Id = result.Entity.Id,
            Message = result.Entity.Message,
            CreatedDate = result.Entity.Created
        };
    }
}