namespace xLib.Application.Common.Interfaces;

using Domain.Entities;
using Domain.Entities.Navigation;
using Microsoft.EntityFrameworkCore;

public interface IApplicationDbContext
{
    public DbSet<Book> Books { get; }
    public DbSet<NavigationItem> NavigationItems { get; }
    public DbSet<LinkItem> LinkItems { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}