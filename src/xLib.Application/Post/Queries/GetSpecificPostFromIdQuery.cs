using MediatR;
using xLib.Application.Post.ViewModels;

namespace xLib.Application.Post.Queries;

public record GetSpecificPostFromIdQuery(Guid Id) : IRequest<PostViewModel>;