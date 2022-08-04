namespace xLib.Application.Post.Handlers;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.Exceptions;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;


public class DeletePostCommandHandler : IRequestHandler<DeletePostCommand>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IRepository<Post> _repository;

    public DeletePostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IRepository<Post> repository)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _repository = repository;
    }

    public async Task<Unit> Handle(DeletePostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var post = _repository.GetSingleById(request.Id);

        if (!post.CreatedByUserId.Equals(user.Id))
        {
            throw new CantDeletePostFromOtherUserException();
        }

        _repository.Remove(post);
        await _repository.SaveChanges(cancellationToken);

        return Unit.Value;
    }
}