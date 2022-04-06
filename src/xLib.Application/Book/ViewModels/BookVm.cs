namespace xLib.Application.Book.ViewModels;

using Domain.Enums;

public class BookVm
{
    public Guid Id { get; set; }
    public Type Type { get; set; }
    public string? SchoolClass { get; set; }
    public string? Subject { get; set; }
    public string? Category { get; set; }
    public string? Number { get; set; }
    public string? Division { get; set; }
    public string? AuthorShort { get; set; }
    public string? Author { get; set; }
    public string Title { get; set; }
    public string? Publisher { get; set; }
    public double? Price { get; set; }
    public Currency? Currency { get; set; }
    public string? Year { get; set; }
    public bool AntolinBook { get; set; }
    public string? SourceOfSupply { get; set; }
    public string? ISBN { get; set; }
    public string? Description { get; set; }
    public string? Special { get; set; }
}