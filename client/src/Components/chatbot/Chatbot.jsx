import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { CircleLoader } from "react-spinners"; // optional loading spinner

const CHATBOT_API = "http://localhost:3000/api/chatbot/chat"; // change if needed

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! I can help you explore categories and products.\nTry typing:\n• show categories\n• paddles\n• beginner",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(CHATBOT_API, { message: input });

      const botMsg = {
        from: "bot",
        text: res.data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Something went wrong. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#b9e018] p-4 rounded-full shadow-xl hover:scale-110 transition transform"
        >
          <ChatBubbleLeftRightIcon className="h-7 w-7 text-black" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[450px] max-w-full h-[650px] bg-black border border-[#b9e018]/40 rounded-3xl shadow-2xl flex flex-col animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#b9e018]/30 bg-black rounded-t-3xl">
            <div>
              <h3 className="text-[#b9e018] font-bold text-lg">
                Pickleball Assistant
              </h3>
              <p className="text-xs text-gray-400">Online • Ready to help</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line relative ${
                  msg.from === "user"
                    ? "ml-auto bg-[#b9e018] text-black"
                    : "bg-gray-800 text-white"
                }`}
              >
                {msg.text}
                <span className="absolute bottom-1 right-2 text-[10px] text-gray-300">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {loading && (
              <div className="ml-2">
                <CircleLoader size={20} color="#b9e018" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#b9e018]/30 bg-black rounded-b-3xl">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-l-2xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#b9e018]"
              />
              <button
                onClick={sendMessage}
                className="px-5 py-3 rounded-r-2xl bg-[#b9e018] text-black font-semibold hover:bg-[#a0c814] transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
