namespace xLib.Domain.Entities;
using xLib.Domain.Common.Interfaces;

public class Post : IBaseEntity
{
    public Guid Id { get; set; }
    public string Message { get; set; }
    public DateTime Created { get; set; }
    public string CreatedByUserId { get; set; }
}