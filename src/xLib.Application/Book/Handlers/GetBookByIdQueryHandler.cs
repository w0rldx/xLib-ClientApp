namespace xLib.Application.Book.Handlers;

using Common.Interfaces;
using MediatR;
using Queries;
using ViewModels;

public class GetBookByIdQueryHandler : IRequestHandler<GetBookByIdQuery, BookVm>
{
    private readonly IMediator _mediator;

    public GetBookByIdQueryHandler(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<BookVm> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetBookQuery());

        var output = result.FirstOrDefault(x => x.Id == request.Id);

        return output;
    }
}