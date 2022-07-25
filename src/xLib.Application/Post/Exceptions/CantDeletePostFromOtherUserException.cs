using System.Runtime.Serialization;

namespace xLib.Application.Post.Exceptions;


public class CantDeletePostFromOtherUserException : Exception
{
    public CantDeletePostFromOtherUserException()
    {
    }

    public CantDeletePostFromOtherUserException(string message) : base(message)
    {
    }

    public CantDeletePostFromOtherUserException(string message, Exception inner) : base(message, inner)
    {
    }
}
