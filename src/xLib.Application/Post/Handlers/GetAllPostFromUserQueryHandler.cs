namespace xLib.Application.Post.Handlers;

using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Queries;
using xLib.Application.Post.ViewModels;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;

public class GetAllPostFromUserQueryHandler : IRequestHandler<GetAllPostFromUserQuery, List<PostViewModel>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IRepository<Post> _repository;

    public GetAllPostFromUserQueryHandler(UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor, IRepository<Post> repository)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _repository = repository;
    }

    public async Task<List<PostViewModel>> Handle(GetAllPostFromUserQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext?.User?.FindFirstValue("uid");
        var searchUser = await _userManager.FindByIdAsync(userId);

        var user = await _userManager.FindByNameAsync(request.UserName);
        var postVMList = new List<PostViewModel>();

        if (user == null)
        {
            return postVMList;
        }

        if (user.Private == true && searchUser.Id != user.Id)
        {
            return postVMList;
        }

        var posts = _repository.GetByExpression(x => x.CreatedByUserId.Equals(user.Id));

        foreach (var post in posts)
        {
            postVMList.Add(new PostViewModel()
            {
                Id = post.Id,
                Message = post.Message,
                CreatedDate = post.Created
            });
        }

        postVMList.Sort((x, y) => DateTime.Compare(y.CreatedDate, x.CreatedDate));

        return postVMList;
    }
}