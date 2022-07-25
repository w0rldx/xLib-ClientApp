using MediatR;

namespace xLib.Application.Post.Commands;

public record DeletePostCommand(Guid Id) : IRequest;