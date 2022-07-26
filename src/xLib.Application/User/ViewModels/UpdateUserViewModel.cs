using Microsoft.AspNetCore.Http;

namespace xLib.Application.User.ViewModels;

public class UpdateUserViewModel
{
    public string UserName { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool Private { get; set; }
}