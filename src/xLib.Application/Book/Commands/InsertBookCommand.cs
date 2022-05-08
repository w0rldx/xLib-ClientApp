namespace xLib.Application.Book.Commands;

using Domain.Enums;
using MediatR;
using ViewModels;

public record InsertBookCommand(Type? Type, string? SchoolClass, string? Subject, string? Category, string? Number, string? Division, string? AuthorShort, string? Author, string Title, string? Publisher, double? Price, Currency Currency, string? Year, bool AntolinBook, string? SourceOfSupply, string? ISBN, string? Description, string? Special) : IRequest<BookVm>;
