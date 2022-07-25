namespace xLib.Infastructure.Persistence;

using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using xLib.Infastructure.Identity.Models;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Post> Posts => Set<Post>();

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>().HasKey(x => x.Id);

        modelBuilder.Entity<Post>()
            .HasOne(typeof(ApplicationUser))
            .WithMany()
            .HasForeignKey("ApplicationUserId");

        base.OnModelCreating(modelBuilder);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}