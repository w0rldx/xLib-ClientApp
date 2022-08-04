namespace xLib.Infastructure.Persistence;

using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using xLib.Infastructure.Identity.Models;

public class ApplicationDbContextInitializer
{
    private readonly ILogger<ApplicationDbContextInitializer> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitializer(ILogger<ApplicationDbContextInitializer> logger,
        ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
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
    }


    private async Task SeedUserAsync()
    {
        //Seed Roles
        if (!_roleManager.Roles.Any())
        {
            await _roleManager.CreateAsync(new IdentityRole(Roles.Administrator.ToString()));
            await _roleManager.CreateAsync(new IdentityRole(Roles.Moderator.ToString()));
            await _roleManager.CreateAsync(new IdentityRole(Roles.Pro.ToString()));
            await _roleManager.CreateAsync(new IdentityRole(Roles.User.ToString()));
        }

        //Seed Default User
        var defaultUser = new ApplicationUser
        {
            UserName = DefaultUser.default_username,
            Email = DefaultUser.default_email,
            EmailConfirmed = true,
            PhoneNumberConfirmed = true,
            FirstName = DefaultUser.default_firstname,
            LastName = DefaultUser.default_lastname
        };

        if (_userManager.Users.All(u => u.Id != defaultUser.Id))
        {
            await _userManager.CreateAsync(defaultUser, DefaultUser.default_password);
            await _userManager.AddToRoleAsync(defaultUser, DefaultUser.default_role.ToString());
        }
    }
}