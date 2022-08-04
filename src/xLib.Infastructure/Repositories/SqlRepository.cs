namespace xLib.Infastructure.Repositories;

using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using xLib.Application.Common.Exceptions;
using xLib.Application.Common.Interfaces;
using xLib.Domain.Common.Interfaces;
using xLib.Infastructure.Persistence;

public class SqlRepository<T> : IRepository<T> where T : class, IBaseEntity
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<T> _dbSet;

    public SqlRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<T>();
    }

    public T GetSingleById(Guid id)
    {
        var result = _dbSet.SingleOrDefault(x => x.Id.Equals(id));

        if (result == null)
        {
            throw new EntityNotFoundException();
        }

        return result;
    }

    public List<T> GetAll()
    {
        var result = _dbSet.ToList();

        return result;
    }

    public List<T> GetByExpression(Expression<Func<T, bool>> condition)
    {
        var result = _dbSet.Where(condition).ToList();

        return result;
    }

    public T Add(T item)
    {
        var result = _dbSet.Add(item);

        return result.Entity;
    }

    public void Remove(T item)
    {
        _dbSet.Remove(item);
    }

    public T Update(Guid id, T updatedEntity)
    {
        var entityToChange = _dbSet.SingleOrDefault(x => x.Id.Equals(id));

        if (entityToChange == null)
        {
            throw new EntityNotFoundException();
        }

        entityToChange = updatedEntity;

        return entityToChange;
    }

    public async Task SaveChanges(CancellationToken cancellationToken)
    {
        await _context.SaveChangesAsync(cancellationToken);
    }
    
}