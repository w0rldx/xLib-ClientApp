namespace xLib.Application.Identity.Exceptions;

public class UserNameAlreadyTakenException : Exception
{
    public UserNameAlreadyTakenException(string? message) : base(message)
    {
    }
}