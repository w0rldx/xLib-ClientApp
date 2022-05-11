namespace xLib.Infastructure.Persistence;

using Domain.Entities;

public static class ApplicationDbContextSeed
{
    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
        await SeedBookDataAsync(context);
    }

    private static async Task SeedBookDataAsync(ApplicationDbContext context)
    {
        if (!context.Books.Any())
        {
            context.Books.AddRange(new Book { Title = "Professional C# 7 and .NET Core 2.0", Publisher = "Wrox Press" },
                new Book { Title = "Professional C# 6 and .NET 4.5.1", Publisher = "Wrox Press" },
                new Book { Title = "Enterprise Services with the .NET Framework", Publisher = "AWL" },
                new Book { Title = "Professional C# 5.0 and the .NET 4.5 Framework", Publisher = "Wrox Press" },
                new Book { Title = "C# 5.0 in a Nutshell", Publisher = "O'Reilly" },
                new Book { Title = "C# 5.0 Unleashed", Publisher = "O'Reilly" }
            );

            await context.SaveChangesAsync();
        }
    }
}