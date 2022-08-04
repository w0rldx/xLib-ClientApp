namespace xLib.Application.User.Queries;

using MediatR;
using xLib.Application.Common.Models;

public record GetUserDetailsQuery() : IRequest<ApplicationUserViewModel>;