namespace xLib.WebApp.Controllers;

using Application.Common.Models;
using Application.Identity.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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