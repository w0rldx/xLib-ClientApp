namespace xLib.Application.Post.Handlers;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Commands;
using xLib.Application.Post.ViewModels;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;

public class AddNewPostCommandHandler : IRequestHandler<AddNewPostCommand, PostViewModel>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IRepository<Post> _repository;

    public AddNewPostCommandHandler(IHttpContextAccessor httpContextAccessor, UserManager<ApplicationUser> userManager, IRepository<Post> repository)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _repository = repository;
    }

    public async Task<PostViewModel> Handle(AddNewPostCommand request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var user = await _userManager.FindByIdAsync(userId);

        var result = _repository.Add(new Post()
        {
            Created = DateTime.UtcNow,
            Message = request.Message,
            CreatedByUserId = user.Id
        
        });

        await _repository.SaveChanges(cancellationToken);

        return new PostViewModel()
        {
            Id = result.Id,
            Message = result.Message,
            CreatedDate = result.Created
        };
    }
}