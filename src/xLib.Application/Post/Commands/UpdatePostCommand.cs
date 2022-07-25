using MediatR;
using xLib.Application.Post.ViewModels;

namespace xLib.Application.Post.Commands;

public record UpdatePostCommand(Guid Id, string Message) : IRequest<PostViewModel>;