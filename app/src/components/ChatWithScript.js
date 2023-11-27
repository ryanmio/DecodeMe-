import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton } from "@nextui-org/react";

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const textAreaRef = useRef(null);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    // Call the new Firebase Cloud Function and update chatHistory
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/chatWithScript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: codeSnippet, userMessage, chatHistory }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: data.response }]);
      setUserMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className={`chat-window ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div onClick={onClose} className="chat-header">Chat with Script</div>
      {isOpen && (
        <>
          <ScrollShadow className="chat-history">
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                {message.content}
              </div>
            ))}
          </ScrollShadow>
          <form onSubmit={handleChatSubmit} className="chat-input">
            <Textarea
              ref={textAreaRef}
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              placeholder="Your message..."
              className="message-input"
              minRows={1} // Start with a single line
              maxRows={3} // Expand up to three lines before scrolling
            />
            <NextUIButton
              type="submit"
              className="send-button"
              auto
              size="small"
              color="primary"
              bordered
            >
              <span>Send</span>
            </NextUIButton>
          </form>
        </>
      )}
    </div>
  );
}