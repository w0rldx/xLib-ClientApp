using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using xLib.Application.Book.Commands;

namespace xLib.WebApp.Controllers
{
    using Application.Book.Queries;
    using Application.Book.ViewModels;

    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<BookVm>>> GetAllBooks()
        {
            return await Mediator.Send(new GetBookQuery());
        }

        [HttpPost]
        public async Task<BookVm> Post(InsertBookCommand command)
        {
            var result = await Mediator.Send(command);

            return result;
        }
    }
}
