using Microsoft.AspNetCore.Mvc;

namespace xLib.WebApp.Controllers
{
    using Application.User.Queries;
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        [Authorize]
        [HttpGet("getuser/{userName}")]
        public async Task<IActionResult> GetUserByNameAsync(string userName)
        {
            var userProfile = await Mediator.Send(new GetUserByNameQuery(userName));
            return Ok(userProfile);
        }
    }
}
