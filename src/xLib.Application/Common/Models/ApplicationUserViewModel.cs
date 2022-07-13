namespace xLib.Application.Common.Models;

public class ApplicationUserViewModel
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string[] Roles { get; set; }
    public bool Private { get; set; }
    public string Email { get; set; }
}