using MediatR;
using Microsoft.AspNetCore.Http;
using xLib.Application.Common.FileUpload;
using xLib.Application.Common.FileUpload.Exceptions;
using xLib.Application.Common.FileUpload.Models;
using xLib.Application.User.Command;

namespace xLib.Application.User.Handlers;

public class
    UploadAvatarAndHeaderProfileCommandHandler : IRequestHandler<UploadAvatarAndHeaderProfileCommand, BlobResponseDto>
{
    private readonly IAzureStorage _storage;

    public UploadAvatarAndHeaderProfileCommandHandler(IAzureStorage storage)
    {
        _storage = storage;
    }

    public async Task<BlobResponseDto> Handle(UploadAvatarAndHeaderProfileCommand request,
        CancellationToken cancellationToken)
    {
        BlobResponseDto? response = await _storage.UploadAsync(request.File);

        if (response.Error == true)
        {
            throw new UploadFailedException(response.Status);
        }
        else
        {
            return response;
        }
    }
}