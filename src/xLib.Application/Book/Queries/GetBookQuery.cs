namespace xLib.Application.Book.Queries;

using MediatR;
using ViewModels;

public record GetBookQuery() : IRequest<List<BookVm>>;