namespace xLib.Infastructure.Identity.Models;

using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string AvatarPictureUrl { get; set; }
    public string HeaderPictureUrl { get; set; }
    public bool Private { get; set; }
}