namespace xLib.Infastructure.Persistence;

using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
}