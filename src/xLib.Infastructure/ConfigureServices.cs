namespace xLib.Infastructure;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using xLib.Application.Common.Helper;
using xLib.Application.Common.Interfaces;
using xLib.Domain.Entities;
using xLib.Infastructure.Identity.Models;
using xLib.Infastructure.Persistence;
using xLib.Infastructure.Repositories;

public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("xLibDb"));
        }
        else
        {
            var connectionString = ConnectionStringBuilder.BuildConnectionString(configuration);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString,
                    builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitializer>();

        services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredUniqueChars = 0;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddIdentityCore<ApplicationUser>();

        services.AddScoped<UserManager<ApplicationUser>>();

        // Repositories
        services.AddScoped<IRepository<Post>, SqlRepository<Post>>();

        return services;
    }
}