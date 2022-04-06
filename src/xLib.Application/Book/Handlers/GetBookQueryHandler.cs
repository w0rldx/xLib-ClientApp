namespace xLib.Application.Book.Handlers;

using Common.Interfaces;
using MediatR;
using Queries;
using ViewModels;

public class GetBookQueryHandler : IRequestHandler<GetBookQuery, List<BookVm>>
{
    private readonly IApplicationDbContext _context;

    public GetBookQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<BookVm>> Handle(GetBookQuery request, CancellationToken cancellationToken)
    {
        List<BookVm> bookListVms = new List<BookVm>();

        foreach (var bookListItem in bookListVms)
        {
            bookListVms.Add(new BookVm()
            {
                Id = bookListItem.Id,
                AntolinBook = bookListItem.AntolinBook,
                Author = bookListItem.Author,
                AuthorShort = bookListItem.AuthorShort,
                SchoolClass = bookListItem.SchoolClass,
                Category = bookListItem.Category,
                Currency = bookListItem.Currency,
                Description = bookListItem.Description,
                Division = bookListItem.Division,
                ISBN = bookListItem.ISBN,
                Number = bookListItem.Number,
                Price = bookListItem.Price,
                Publisher = bookListItem.Publisher,
                SourceOfSupply = bookListItem.SourceOfSupply,
                Special = bookListItem.Special,
                Subject = bookListItem.Subject,
                Title = bookListItem.Title,
                Type = bookListItem.Type,
                Year = bookListItem.Year
            });
        }

        return bookListVms;
    }
}