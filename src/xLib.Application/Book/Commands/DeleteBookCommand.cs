namespace xLib.Application.Book.Commands;

using MediatR;

public record DeleteBookCommand(Guid Id) : IRequest;