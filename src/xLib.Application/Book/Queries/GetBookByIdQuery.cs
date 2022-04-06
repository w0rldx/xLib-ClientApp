namespace xLib.Application.Book.Queries;

using MediatR;
using ViewModels;

public record GetBookByIdQuery(Guid Id) : IRequest<BookVm>;