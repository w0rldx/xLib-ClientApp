namespace xLib.WebApp.Controllers;

using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UserController : ApiControllerBase
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync(RegisterModel model)
    {
        var result = await _userService.RegisterAsync(model);
        
        return Ok(result);
    }

    [HttpPost("token")]
    public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
    {
        var result = await _userService.GetTokenAsync(model);
        
        return Ok(result);
    }

    [HttpPost("addrole")]
    public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
    {
        var result = await _userService.AddRoleAsync(model);
        
        return Ok(result);
    }

    [Authorize]
    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser(string mail)
    {
        var result = await _userService.GetUserAsync(mail);
        
        return Ok(result);
    }
}