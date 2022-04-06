namespace xLib.Application.Book.Handlers;

using Commands;
using Common.Interfaces;
using Domain.Entities;
using MediatR;
using ViewModels;

public class InsertBookCommandHandler : IRequestHandler<InsertBookCommand, BookVm>
{
    private readonly IApplicationDbContext _context;

    public InsertBookCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<BookVm> Handle(InsertBookCommand request, CancellationToken cancellationToken)
    {
        Book bookToAdd = new Book()
        {
            AntolinBook = request.AntolinBook,
            Author = request.Author,
            AuthorShort = request.AuthorShort,
            SchoolClass = request.SchoolClass,
            Category = request.Category,
            Currency = request.Currency,
            Description = request.Description,
            Division = request.Division,
            ISBN = request.ISBN,
            Number = request.Number,
            Price = request.Price,
            Publisher = request.Publisher,
            SourceOfSupply = request.SourceOfSupply,
            Special = request.Special,
            Subject = request.Subject,
            Title = request.Title,
            Type = request.Type,
            Year = request.Year
        };
        
        var savedResult = _context.Books.Add(bookToAdd);
        await _context.SaveChangesAsync(cancellationToken);

        var result = new BookVm()
        {
            Id = savedResult.Entity.Id,
            AntolinBook = savedResult.Entity.AntolinBook,
            Author = savedResult.Entity.Author,
            AuthorShort = savedResult.Entity.AuthorShort,
            SchoolClass = savedResult.Entity.SchoolClass,
            Category = savedResult.Entity.Category,
            Currency = savedResult.Entity.Currency,
            Description = savedResult.Entity.Description,
            Division = savedResult.Entity.Division,
            ISBN = savedResult.Entity.ISBN,
            Number = savedResult.Entity.Number,
            Price = savedResult.Entity.Price,
            Publisher = savedResult.Entity.Publisher,
            SourceOfSupply = savedResult.Entity.SourceOfSupply,
            Special = savedResult.Entity.Special,
            Subject = savedResult.Entity.Subject,
            Title = savedResult.Entity.Title,
            Type = savedResult.Entity.Type,
            Year = savedResult.Entity.Year
        };

        return result;
    }
}