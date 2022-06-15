namespace xLib.WebApp.Controllers;

using Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using xLib.Application.User.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class UserController : ApiControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("registerUser")]
    public async Task<ActionResult> RegisterAsync(RegisterModel model)
    {
        var result = await _userService.RegisterAsync(model);

        return Ok(result);
    }

    [HttpPost("loginUser")]
    public async Task<IActionResult> GetTokenAsync(LoginModel model)
    {
        var result = await _userService.GetTokenAsync(model);

        return Ok(result);
    }

    [Authorize]
    [HttpGet("getUser")]
    public async Task<IActionResult> GetUser()
    {
        var result = await _userService.GetUserDetailsAsync();

        return Ok(result);
    }

    [Authorize]
    [HttpPost("addRole")]
    public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
    {
        var result = await _userService.AddRoleAsync(model);

        return Ok(result);
    }
}