namespace xLib.Application.Book.ViewModels;

using Domain.Enums;

public class BookMinimalVm
{
    public Guid Id { get; set; }
    public Type Type { get; set; }
    public string Title { get; set; }
    public string? Author { get; set; }
    public string? ISBN { get; set; }
}