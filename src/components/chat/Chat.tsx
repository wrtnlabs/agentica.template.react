import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "This is a mock response. Implement actual AI integration here."
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="relative w-full h-[calc(100vh-4rem)]">
        <div className="h-full flex flex-col bg-zinc-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-700/50">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                Start a conversation by sending a message...
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
          </div>

          <div className="p-4 bg-zinc-900/50">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
