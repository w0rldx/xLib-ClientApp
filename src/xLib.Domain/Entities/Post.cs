namespace xLib.Domain.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Post
{
    [Key] public Guid Id { get; set; }
    public string Message { get; set; }
    public DateTime Created { get; set; }
    public string CreatedByUserId { get; set; }
}