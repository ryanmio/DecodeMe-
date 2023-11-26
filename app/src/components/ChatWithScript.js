import React, { useState } from 'react';
import { ScrollShadow, Button as NextUIButton } from "@nextui-org/react";

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    // Call the new Firebase Cloud Function and update chatHistory
  };

  return (
    <div className={`chat-window ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div onClick={onClose} className="chat-header">Chat with Script</div>
      {isOpen && (
        <>
          <ScrollShadow className="chat-history">
            {/* Map through chatHistory and display each message */}
          </ScrollShadow>
          <form onSubmit={handleChatSubmit} className="chat-input">
            <input
              type="text"
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
              className="message-input"
            />
            <NextUIButton
              type="submit"
              auto
              size="small"
              color="primary"
              bordered
              className="p-2"
            >
              Send
            </NextUIButton>
          </form>
        </>
      )}
    </div>
  );
}