namespace xLib.Infastructure.Persistence;

using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using xLib.Infastructure.Identity.Models;

public class ApplicationDbContextInitialiser
{

    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsNpgsql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await SeedDataAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task SeedDataAsync()
    {
        await SeedUserAsync();
        await SeedBookDataAsync();
    }


    private async Task SeedUserAsync()
    {
        //Seed Roles
        await _roleManager.CreateAsync(new IdentityRole(Roles.Administrator.ToString()));
        await _roleManager.CreateAsync(new IdentityRole(Roles.User.ToString()));
        //Seed Default User
        var defaultUser = new ApplicationUser { UserName = DefaultUser.default_username, Email = DefaultUser.default_email, EmailConfirmed = true, PhoneNumberConfirmed = true, FirstName = "Default FirstName", LastName = "Default LastName" };
        if (_userManager.Users.All(u => u.Id != defaultUser.Id))
        {
            await _userManager.CreateAsync(defaultUser, DefaultUser.default_password);
            await _userManager.AddToRoleAsync(defaultUser, DefaultUser.default_role.ToString());
        }
    }

    private async Task SeedBookDataAsync()
    {
        if (!_context.Books.Any())
        {
            _context.Books.AddRange(new Book { Title = "Professional C# 7 and .NET Core 2.0", Publisher = "Wrox Press" },
                new Book { Title = "Professional C# 6 and .NET 4.5.1", Publisher = "Wrox Press" },
                new Book { Title = "Enterprise Services with the .NET Framework", Publisher = "AWL" },
                new Book { Title = "Professional C# 5.0 and the .NET 4.5 Framework", Publisher = "Wrox Press" },
                new Book { Title = "C# 5.0 in a Nutshell", Publisher = "O'Reilly" },
                new Book { Title = "C# 5.0 Unleashed", Publisher = "O'Reilly" }
            );

            await _context.SaveChangesAsync();
        }
    }
}