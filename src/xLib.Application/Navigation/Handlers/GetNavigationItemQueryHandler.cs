namespace xLib.Application.Navigation.Handlers;

using Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries;
using ViewModels;

public class GetNavigationItemQueryHandler : IRequestHandler<GetNavigationItemQuery, List<NavigationItemVm>>
{
    private readonly IApplicationDbContext _context;

    public GetNavigationItemQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<NavigationItemVm>> Handle(GetNavigationItemQuery request, CancellationToken cancellationToken)
    {
        List<NavigationItemVm> result = new List<NavigationItemVm>();

        var navItems = await _context.NavigationItems
            .Include(x => x.Links)
            .ToListAsync();

        foreach (var navigationItem in navItems)
        {
            List<LinkItemVm> linksVm = new List<LinkItemVm>();

            foreach (var navigationItemLink in navigationItem.Links)
            {
                linksVm.Add(new LinkItemVm()
                {
                    Label = navigationItemLink.Label,
                    Link = navigationItemLink.Link,
                });
            }

            result.Add(new NavigationItemVm()
            {
                Links = linksVm,
                Label = navigationItem.Label,
                Icon = navigationItem.Icon,
                InitiallyOpened = false,
                Index = navigationItem.Index
            });
        }

        return result;
    }
}