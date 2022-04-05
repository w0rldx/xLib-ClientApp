namespace xLib.Infastructure;

using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.
                    UseInMemoryDatabase("ProjectBoardDb"));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.
                    UseNpgsql(configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>();

        return services;
    }
}