namespace xLib.WebApp.Controllers;

using Application.Navigation.Queries;
using Application.Navigation.ViewModels;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class NavigationController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<NavigationItemVm>>> GetAll()
    {
        return await Mediator.Send(new GetNavigationItemQuery());
    }
}