namespace xLib.Application.Book.Handlers;

using Commands;
using Common.Exceptions;
using Common.Interfaces;
using MediatR;

public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateBookCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<Unit> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
    {
        var bookListsDb = _context.Books.FirstOrDefault(x => x.Id == request.Id);

        if (bookListsDb == null)
        {
            throw new EntityNotFoundException();
        }

        bookListsDb.Title = request.Title;
        bookListsDb.AntolinBook = request.AntolinBook;
        bookListsDb.Author = request.Author;
        bookListsDb.AuthorShort = request.AuthorShort;
        bookListsDb.SchoolClass = request.SchoolClass;
        bookListsDb.Category = request.Category;
        bookListsDb.Currency = request.Currency;
        bookListsDb.Description = request.Description;
        bookListsDb.Division = request.Division;
        bookListsDb.ISBN = request.ISBN;
        bookListsDb.Number = request.Number;
        bookListsDb.Price = request.Price;
        bookListsDb.Publisher = request.Publisher;
        bookListsDb.SourceOfSupply = request.SourceOfSupply;
        bookListsDb.Special = request.Special;
        bookListsDb.Subject = request.Subject;
        bookListsDb.Title = request.Title;
        bookListsDb.Type = request.Type;
        bookListsDb.Year = request.Year;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}