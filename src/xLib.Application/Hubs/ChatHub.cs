using Microsoft.AspNetCore.SignalR;
using xLib.Application.Hubs.Models;

namespace xLib.Application.Hubs;

public class ChatHub : Hub<IChatClient>
{
    public async Task SendMessage(ChatMessage message)
    {
        await Clients.All.ReceiveMessage(message);
    }
}
