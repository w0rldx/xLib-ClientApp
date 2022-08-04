namespace xLib.Application.Post.Handlers;

using MediatR;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Exceptions;
using xLib.Application.Post.Queries;
using xLib.Application.Post.ViewModels;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;

public class GetSpecificPostFromIdQueryHandler : IRequestHandler<GetSpecificPostFromIdQuery, PostViewModel>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IRepository<Post> _repository;

    public GetSpecificPostFromIdQueryHandler(UserManager<ApplicationUser> userManager, IRepository<Post> repository)
    {
        _userManager = userManager;
        _repository = repository;
    }

    public async Task<PostViewModel> Handle(GetSpecificPostFromIdQuery request, CancellationToken cancellationToken)
    {
        var post = _repository.GetSingleById(request.Id);

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