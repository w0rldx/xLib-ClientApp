namespace xLib.Application;

using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

public static class ConfigureServices
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(Assembly.GetExecutingAssembly());
        services.AddSignalR();

        return services;
    }
}