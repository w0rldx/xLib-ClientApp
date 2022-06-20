namespace xLib.Application.User.Queries;

using MediatR;
using ViewModels;

public record GetUserByNameQuery(string Username) : IRequest<UserViewModel>;
