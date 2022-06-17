namespace xLib.Application.User.Exceptions;

public class EmailAlreadyRegisteredException : Exception
{
    public EmailAlreadyRegisteredException(string? message) : base(message)
    {
    }
}