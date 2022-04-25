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

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<BookVm>> GetBookById(Guid id)
        {
            return await Mediator.Send(new GetBookByIdQuery(id));
        }

        [HttpPost]
        public async Task<BookVm> Post(InsertBookCommand command)
        {
            var result = await Mediator.Send(command);

            return result;
        }
    }
}
