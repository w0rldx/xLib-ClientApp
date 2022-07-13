namespace xLib.Application.Common.Models;

using System.ComponentModel.DataAnnotations;

public class AddRoleViewModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string Role { get; set; }
}