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

    const style = window.getComputedStyle(textAreaRef.current);
    const lineHeight = parseInt(style.lineHeight, 10);
    const paddingTop = parseInt(style.paddingTop, 10);
    const paddingBottom = parseInt(style.paddingBottom, 10);
    const borderTop = parseInt(style.borderTopWidth, 10);
    const borderBottom = parseInt(style.borderBottomWidth, 10);

    const lines = userMessage.split('\n').length || 1;
    const newHeight = `${lineHeight * lines + paddingTop + paddingBottom + borderTop + borderBottom}px`;

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
              <span>Send</span>
            </NextUIButton>
          </form>
        </>
      )}
    </div>
  );
}
