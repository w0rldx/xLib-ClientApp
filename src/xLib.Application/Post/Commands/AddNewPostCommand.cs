using MediatR;
using xLib.Application.Post.ViewModels;

namespace xLib.Application.Post.Commands;

public record AddNewPostCommand(string Message) : IRequest<PostViewModel>;