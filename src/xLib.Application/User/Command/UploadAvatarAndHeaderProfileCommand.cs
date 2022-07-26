using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using xLib.Application.Common.FileUpload.Models;
using xLib.Application.User.ViewModels;

namespace xLib.Application.User.Command;

public record UploadAvatarAndHeaderProfileCommand(IFormFile File) : IRequest<BlobResponseDto>;