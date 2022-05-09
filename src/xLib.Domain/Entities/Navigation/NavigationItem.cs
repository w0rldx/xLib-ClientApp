namespace xLib.Domain.Entities.Navigation;

using Common.Interfaces;

public class NavigationItem : IBaseEntity
{
    public Guid Id { get; set; }
    public int Index { get; set; }
    public string Label { get; set; }
    public string Icon { get; set; }
    public bool InitiallyOpened { get; set; }
    public List<LinkItem> Links { get; set; }
}
