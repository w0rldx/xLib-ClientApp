namespace xLib.Infastructure.Identity;

using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}