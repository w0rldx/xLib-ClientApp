namespace xLib.Application.Identity.Exceptions;

public class EmailAlreadyRegisteredException : Exception
{
    public EmailAlreadyRegisteredException(string? message) : base(message)
    {
    }
}