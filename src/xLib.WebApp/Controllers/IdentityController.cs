namespace xLib.WebApp.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using xLib.Application.Common.Models;
using xLib.Application.Identity.Interfaces;
using xLib.Application.User.Queries;

[Route("api/[controller]")]
[ApiController]
public class IdentityController : ApiControllerBase
{
    private readonly IIdentityService _userService;
    public IdentityController(IIdentityService userService)
    {
        _userService = userService;
    }

    [HttpPost("registerUser")]
    public async Task<ActionResult> RegisterAsync(RegisterViewModel model)
    {
        var result = await _userService.RegisterAsync(model);

        return Ok(result);
    }

    [HttpPost("loginUser")]
    public async Task<IActionResult> GetTokenAsync(LoginViewModel model)
    {
        var result = await _userService.GetTokenAsync(model);

        return Ok(result);
    }

    [Authorize]
    [HttpGet("getUser")]
    public async Task<ActionResult<ApplicationUserViewModel>> GetUser()
    {
        return await Mediator.Send(new GetUserDetailsQuery());
    }

    [Authorize]
    [HttpPost("addRole")]
    public async Task<IActionResult> AddRoleAsync(AddRoleViewModel model)
    {
        var result = await _userService.AddRoleAsync(model);

        return Ok(result);
    }
}