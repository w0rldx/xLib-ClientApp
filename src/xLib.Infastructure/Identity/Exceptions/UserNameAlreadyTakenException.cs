namespace xLib.Infastructure.Identity.Exceptions;

public class UserNameAlreadyTakenException : Exception
{
    public UserNameAlreadyTakenException(string? message) : base(message)
    {
    }
}