namespace xLib.Application.Post.Handlers;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.Exceptions;
using xLib.Application.Post.ViewModels;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;

public class UpdatePostCommandHandler : IRequestHandler<UpdatePostCommand, PostViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;
    private readonly IRepository<Post> _repository;

    public UpdatePostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IRepository<Post> repository)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _repository = repository;
    }

    public async Task<PostViewModel> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var post = _repository.GetSingleById(request.Id);

        if (post.CreatedByUserId != user.Id)
        {
            throw new ForbiddenAccessException();
        }

        post.Message = request.Message;

        var result = _repository.Update(request.Id, post);
        await _repository.SaveChanges(cancellationToken);

        return new PostViewModel()
        {
            Id = result.Id,
            Message = result.Message,
            CreatedDate = result.Created
        };
    }
}