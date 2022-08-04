namespace xLib.Domain.Common.Interfaces;

using System.ComponentModel.DataAnnotations;

public interface IBaseEntity
{
    [Key] public Guid Id { get; set; }
}