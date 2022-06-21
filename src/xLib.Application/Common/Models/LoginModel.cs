﻿namespace xLib.Application.Common.Models;

using System.ComponentModel.DataAnnotations;

public class LoginModel
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }

}