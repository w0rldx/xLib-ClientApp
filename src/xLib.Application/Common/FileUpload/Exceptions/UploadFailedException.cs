using System.Runtime.Serialization;

namespace xLib.Application.Common.FileUpload.Exceptions;

public class UploadFailedException : Exception
{
    //
    // For guidelines regarding the creation of new exception types, see
    //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
    // and
    //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
    //

    public UploadFailedException()
    {
    }

    public UploadFailedException(string message) : base(message)
    {
    }

    public UploadFailedException(string message, Exception inner) : base(message, inner)
    {
    }
}