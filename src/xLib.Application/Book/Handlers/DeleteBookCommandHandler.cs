namespace xLib.Application.Book.Handlers;

using Commands;
using Common.Exceptions;
using Common.Interfaces;
using MediatR;

public class DeleteBookCommandHandler : IRequestHandler<DeleteBookCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteBookCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteBookCommand request, CancellationToken cancellationToken)
    {
        var book = _context.Books.FirstOrDefault(x => x.Id == request.Id);

        if (book == null)
        {
            throw new EntityNotFoundException();
        }

        _context.Books.Remove(book);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}