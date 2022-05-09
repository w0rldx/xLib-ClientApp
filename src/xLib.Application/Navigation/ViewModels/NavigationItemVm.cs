namespace xLib.Application.Navigation.ViewModels;

public class NavigationItemVm
{
    public string Label { get; set; }
    public string Icon { get; set; }
    public int Index { get; set; }
    public bool InitiallyOpened { get; set; }
    public List<LinkItemVm> Links { get; set; }
}