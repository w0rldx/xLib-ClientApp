using Microsoft.AspNetCore.Mvc;
using xLib.Application.Common.FileUpload.Models;
using xLib.Application.Common.Helper;
using xLib.Application.User.Command;
using xLib.Application.User.ViewModels;

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


        [Authorize]
        [HttpPut("updateUser")]
        public async Task<IActionResult> GetUserByNameAsync([ModelBinder(BinderType = typeof(JsonModelBinder))] UpdateUserViewModel model, IFormFile? avatarFile, IFormFile? headerFile)
        {
            BlobResponseDto avatar = null;
            BlobResponseDto header = null;

            if (avatarFile != null)
            {
                avatar = await Mediator.Send(new UploadAvatarAndHeaderProfileCommand(avatarFile));
            }

            if (headerFile != null)
            {
                header = await Mediator.Send(new UploadAvatarAndHeaderProfileCommand(headerFile));
            }

            var userProfile = await Mediator.Send(new UpdateUserCommand(model.UserName, avatar, header, model.FirstName,
                model.LastName, model.Private));

            return Ok(userProfile);
        }
    }
}
