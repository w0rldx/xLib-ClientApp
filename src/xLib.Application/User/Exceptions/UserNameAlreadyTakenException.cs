namespace xLib.Application.User.Exceptions;

public class UserNameAlreadyTakenException : Exception
{
    public UserNameAlreadyTakenException(string? message) : base(message)
    {
    }
}