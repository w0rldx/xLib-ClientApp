namespace xLib.Application.Common.Helper;

using Microsoft.Extensions.Configuration;

public static class ConnectionStringBuilder
{
    public static string BuildConnectionString(IConfiguration configuration)
    {
        string connectionString = "";

        var isInsideContainer = Environment.GetEnvironmentVariable("CONTAINER");

        if (!string.IsNullOrEmpty(isInsideContainer))
        {
            var dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
            var dbUser = Environment.GetEnvironmentVariable("DB_USER");
            var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var dbPort = Environment.GetEnvironmentVariable("DB_PORT");

            connectionString = $"host={dbServer}:{dbPort};database={dbName};user id={dbUser};password={dbPassword};";
        }
        else
        {
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        return connectionString;
    }
}