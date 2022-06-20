using Microsoft.AspNetCore.Mvc;

namespace xLib.WebApp.Controllers
{
    using Microsoft.AspNetCore.Authorization;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ApiControllerBase
    {
        [Authorize]
        [HttpPost("getuser/{userName}")]
        public async Task<IActionResult> GetUserByNameAsync(string userName)
        {
            return Ok();
        }
    }
}
