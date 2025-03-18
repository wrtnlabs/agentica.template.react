import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 min-h-[44px] max-h-[160px] p-3 bg-zinc-700/50 text-gray-100 placeholder:text-gray-400 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
      />
      <button
        onClick={handleSubmit}
        disabled={!message.trim()}
        className="px-4 py-2 bg-white text-zinc-900 font-medium rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Send
      </button>
    </div>
  );
}
