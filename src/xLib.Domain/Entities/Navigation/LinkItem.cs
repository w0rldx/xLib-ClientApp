namespace xLib.Domain.Entities.Navigation;

using Common.Interfaces;

public class LinkItem : IBaseEntity
{
    public Guid Id { get; set; }
    public string Label { get; set; }
    public string Link { get; set; }
}