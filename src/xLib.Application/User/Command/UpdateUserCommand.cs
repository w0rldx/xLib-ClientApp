using MediatR;
using xLib.Application.Common.FileUpload.Models;
using xLib.Application.User.ViewModels;

namespace xLib.Application.User.Command;

public record UpdateUserCommand(string UserName, BlobResponseDto? Avatar, BlobResponseDto? HeaderPicture,
    string FirstName, string LastName, bool Private) : IRequest<UserViewModel>;