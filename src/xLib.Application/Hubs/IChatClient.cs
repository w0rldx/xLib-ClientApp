using xLib.Application.Hubs.Models;

namespace xLib.Application.Hubs;

public interface IChatClient
{
    Task ReceiveMessage(ChatMessage message);
}