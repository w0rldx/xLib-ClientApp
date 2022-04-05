namespace xLib.Domain.Common.Interfaces;

public interface IAuditableEntity
{
    public DateTime Created { get; set; }
    public DateTime? LastModified { get; set; }
}