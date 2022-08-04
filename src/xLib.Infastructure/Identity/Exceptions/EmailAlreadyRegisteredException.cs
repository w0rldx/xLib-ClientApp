namespace xLib.Infastructure.Identity.Exceptions;

public class EmailAlreadyRegisteredException : Exception
{
    public EmailAlreadyRegisteredException(string? message) : base(message)
    {
    }
}