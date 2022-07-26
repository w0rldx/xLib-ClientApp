using Microsoft.AspNetCore.Http;
using xLib.Application.Common.FileUpload.Models;

namespace xLib.Application.Common.FileUpload;

public interface IAzureStorage
{
    Task<BlobResponseDto> UploadAsync(IFormFile file);
    Task<BlobResponseDto> DeleteAsync(string blobFilename);

}