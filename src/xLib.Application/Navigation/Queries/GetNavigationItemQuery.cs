namespace xLib.Application.Navigation.Queries;

using MediatR;
using ViewModels;

public record GetNavigationItemQuery() : IRequest<List<NavigationItemVm>>;
