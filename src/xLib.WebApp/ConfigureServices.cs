namespace xLib.WebApp;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using xLib.Infastructure.Identity;
using xLib.Infastructure.Persistence;

public static class ConfigureServices
{
    public static IServiceCollection AddWebApiServices(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();

        services.AddHealthChecks()
            .AddDbContextCheck<ApplicationDbContext>();

        // Customise default API behaviour
        services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        // Force lower case on routes
        services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

        return services;
    }
}