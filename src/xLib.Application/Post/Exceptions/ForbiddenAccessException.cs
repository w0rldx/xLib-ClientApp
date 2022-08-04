using System.Runtime.Serialization;

namespace xLib.Application.Post.Exceptions;

public class ForbiddenAccessException : Exception
{
    public ForbiddenAccessException()
    {
    }

    public ForbiddenAccessException(string message) : base(message)
    {
    }

    public ForbiddenAccessException(string message, Exception inner) : base(message, inner)
    {
    }
}