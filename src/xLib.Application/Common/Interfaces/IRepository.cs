namespace xLib.Application.Common.Interfaces;

using System.Linq.Expressions;
using xLib.Domain.Common.Interfaces;

public interface IRepository<T> where T : class, IBaseEntity
{
    T Add(T entity);
    T GetSingleById(Guid id);
    List<T> GetAll();
    List<T> GetByExpression(Expression<Func<T, bool>> condition);
    void Remove(T entity);
    T Update(Guid id, T updatedEntity);
    Task SaveChanges(CancellationToken cancellationToken);
}