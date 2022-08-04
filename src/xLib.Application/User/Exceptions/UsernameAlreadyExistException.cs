namespace xLib.Application.User.Exceptions;

public class UsernameAlreadyExistException : Exception
{
    //
    // For guidelines regarding the creation of new exception types, see
    //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
    // and
    //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
    //

    public UsernameAlreadyExistException()
    {
    }

    public UsernameAlreadyExistException(string message) : base(message)
    {
    }

    public UsernameAlreadyExistException(string message, Exception inner) : base(message, inner)
    {
    }
}