namespace xLib.Infastructure.Persistence;

using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using xLib.Domain.Entities.Navigation;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<NavigationItem> NavigationItems => Set<NavigationItem>();
    public DbSet<LinkItem> LinkItems => Set<LinkItem>();


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<NavigationItem>().HasMany(x => x.Links);

        modelBuilder.HasSequence<int>("IndexNumbers")
            .StartsAt(1)
            .IncrementsBy(1);

        modelBuilder.Entity<NavigationItem>()
            .Property(x => x.Index)
            .HasDefaultValueSql("nextval('\"IndexNumbers\"')");

        base.OnModelCreating(modelBuilder);
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        return base.SaveChangesAsync(cancellationToken);
    }
}