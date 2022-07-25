using MediatR;
using xLib.Application.Post.ViewModels;

namespace xLib.Application.Post.Queries;

public record GetAllPostFromUserQuery(string UserName) : IRequest<List<PostViewModel>>;