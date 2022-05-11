namespace xLib.Application.Common.Interfaces;

using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public interface IApplicationDbContext
{
    public DbSet<Book> Books { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}