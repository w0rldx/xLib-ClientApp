namespace xLib.Infastructure.Persistence;

using Domain.Entities;
using Domain.Entities.Navigation;

public static class ApplicationDbContextSeed
{
    public static async Task SeedSampleDataAsync(ApplicationDbContext context)
    {
        // Seed, if necessary
        if (!context.Books.Any())
        {
            context.Books.AddRange(new Book { Title = "Professional C# 7 and .NET Core 2.0", Publisher = "Wrox Press" },
                new Book() { Title = "Professional C# 6 and .NET 4.5.1", Publisher = "Wrox Press" },
                new Book() { Title = "Enterprise Services with the .NET Framework", Publisher = "AWL" },
                new Book() { Title = "Professional C# 5.0 and the .NET 4.5 Framework", Publisher = "Wrox Press" },
                new Book() { Title = "C# 5.0 in a Nutshell", Publisher = "O'Reilly" },
                new Book() { Title = "C# 5.0 Unleashed", Publisher = "O'Reilly" }
            );

            await context.SaveChangesAsync();
        }

        if (!context.NavigationItems.Any() && !context.LinkItems.Any())
        {
            LinkItem link1 = new LinkItem { Label = "Overview", Link = "/" };
            LinkItem link2 = new LinkItem { Label = "Forecasts", Link = "/" };
            LinkItem link3 = new LinkItem { Label = "Outlook", Link = "/" };
            LinkItem link4 = new LinkItem { Label = "Real time", Link = "/" };
            LinkItem link5 = new LinkItem { Label = "Upcoming releases", Link = "/" };
            LinkItem link6 = new LinkItem { Label = "Previous releases", Link = "/" };
            LinkItem link7 = new LinkItem { Label = "Releases schedule", Link = "/" };
            LinkItem link8 = new LinkItem { Label = "Enable 2FA", Link = "/" };
            LinkItem link9 = new LinkItem { Label = "Change password", Link = "/" };
            LinkItem link10 = new LinkItem { Label = "Recovery codes", Link = "/" };

            context.LinkItems.AddRange(link1, link2, link3, link4, link5, link6, link7, link8, link9, link10);

            context.NavigationItems.AddRange(
                new NavigationItem { Label = "Dashboard", Icon = "ai/AiOutlineDashboard" },
                new NavigationItem { Label = "Market news", Icon = "AiOutlineProject", InitiallyOpened = true, Links = new List<LinkItem> { link1, link2, link3, link4 } },
                new NavigationItem { Label = "Releases", Icon = "ai/AiOutlineCalendar", Links = new List<LinkItem> { link5, link6, link7 } },
                new NavigationItem { Label = "Analytics", Icon = "ai/AiOutlineFundProjectionScreen" },
                new NavigationItem { Label = "Contracts", Icon = "ai/AiOutlineFile" },
                new NavigationItem { Label = "Settings", Icon = "ai/AiOutlineSetting" },
                new NavigationItem { Label = "Security", Icon = "ai/AiOutlineLock", Links = new List<LinkItem> { link8, link9, link10 } }
                );

            await context.SaveChangesAsync();
        }
    }
}