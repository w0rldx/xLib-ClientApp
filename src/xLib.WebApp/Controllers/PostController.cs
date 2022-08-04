namespace xLib.WebApp.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using xLib.Application.Post.Commands;
using xLib.Application.Post.Queries;
using xLib.Application.Post.ViewModels;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class PostController : ApiControllerBase
{
    [Authorize]
    [HttpGet("getAllPostFromUser/{userName}")]
    public async Task<IActionResult> GetAllPostFromUserAsync(string userName)
    {
        var userPosts = await Mediator.Send(new GetAllPostFromUserQuery(userName));
        return Ok(userPosts);
    }

    [Authorize]
    [HttpGet("getById/{id}")]
    public async Task<IActionResult> GetAllPostFromUserAsync(Guid id)
    {
        var userPosts = await Mediator.Send(new GetSpecificPostFromIdQuery(id));
        return Ok(userPosts);
    }

    [Authorize]
    [HttpPost("addNewPost")]
    public async Task<IActionResult> AddNewPostForUser(AddNewPostViewModel model)
    {
        var userPosts = await Mediator.Send(new AddNewPostCommand(model.Message));
        return Ok(userPosts);
    }

    [Authorize]
    [HttpPut("updatePost")]
    public async Task<IActionResult> UpdatePost(UpdatePostViewModel model)
    {
        var userPosts = await Mediator.Send(new UpdatePostCommand(model.Id, model.Message));
        return Ok(userPosts);
    }


    [Authorize]
    [HttpDelete("deletePost/{id}")]
    public async Task<IActionResult> AddNewPostForUser(Guid id)
    {
        await Mediator.Send(new DeletePostCommand(id));
        return Ok();
    }
}