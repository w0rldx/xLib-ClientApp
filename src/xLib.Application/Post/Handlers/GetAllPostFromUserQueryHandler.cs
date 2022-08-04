using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using xLib.Application.Common.Interfaces;
using xLib.Application.Post.Queries;
using xLib.Application.Post.ViewModels;
using xLib.Infastructure.Identity.Models;

namespace xLib.Application.Post.Handlers;

public class GetAllPostFromUserQueryHandler : IRequestHandler<GetAllPostFromUserQuery, List<PostViewModel>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetAllPostFromUserQueryHandler(UserManager<ApplicationUser> userManager, IApplicationDbContext context,
        IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _context = context;
        _httpContextAccessor = httpContextAccessor;
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

        var posts = _context.Posts.Where(x => x.CreatedByUserId.Equals(user.Id)).ToList();

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