import React from "react";

const ChatMessage = ({ from, text }) => {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-xl text-sm whitespace-pre-line
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-gray-800 rounded-bl-none shadow"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
