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
            var book = await Mediator.Send(new GetBookByIdQuery(id));
            return Ok(book);
        }

        [HttpPost]
        public async Task<BookVm> AddNewBook(InsertBookCommand command)
        {
            var result = await Mediator.Send(command);

            //return CreatedAtRoute("GetBookById", new {id = result.Id}, result);
            return result;
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBook(UpdateBookCommand command)
        { 
            await Mediator.Send(command);

            return StatusCode(201);
        }
    }
}
