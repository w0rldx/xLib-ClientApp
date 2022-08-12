using Microsoft.AspNetCore.Mvc;

namespace xLib.WebApp.Controllers
{
    using xLib.Application.Common.Helper;

    [Route("api/[controller]")]
    [ApiController]
    public class EnvironmentController : ApiControllerBase
    {
        private readonly IConfiguration _configuration;

        public EnvironmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("getEnvironmentSettings")]
        public async Task<IActionResult> GetEnvironmentSettingsAsync()
        {
            var result = $"Host: {Environment.MachineName}\n" +
                         $"Connection String: {ConnectionStringBuilder.BuildConnectionString(_configuration)}";
            return Ok(result);
        }
    }
}
