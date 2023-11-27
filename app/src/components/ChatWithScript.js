import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton } from "@nextui-org/react";

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const textAreaRef = useRef(null);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    // Call the new Firebase Cloud Function and update chatHistory
  };

  useEffect(() => {
    if (!textAreaRef.current) return;

    const scrollHeight = textAreaRef.current.scrollHeight;
    const lineHeight = parseInt(window.getComputedStyle(textAreaRef.current).lineHeight, 10);

    const lines = userMessage.split('\n').length || 1;
    const newHeight = `${Math.min(lines * lineHeight, 3 * lineHeight)}px`;

    setTextAreaHeight(newHeight);
  }, [userMessage]);

  return (
    <div className={`chat-window ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div onClick={onClose} className="chat-header">Chat with Script</div>
      {isOpen && (
        <>
          <ScrollShadow className="chat-history">
            {/* Map through chatHistory and display each message */}
          </ScrollShadow>
          <form onSubmit={handleChatSubmit} className="chat-input">
            <Textarea
              ref={textAreaRef}
              style={{ height: textAreaHeight }}
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              placeholder="Your message..."
              className="message-input"
            />
            <NextUIButton
              type="submit"
              className="send-button"
              auto
              size="small"
              color="primary"
              bordered
            >
              Send
            </NextUIButton>
          </form>
        </>
      )}
    </div>
  );
}
