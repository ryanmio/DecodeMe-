import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton } from "@nextui-org/react";

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const textAreaRef = useRef(null);

  // No need to manage the height state manually if using maxRows
  // const [textAreaHeight, setTextAreaHeight] = useState(null);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    // Call the new Firebase Cloud Function and update chatHistory
  };

  // This effect is unnecessary if maxRows is used
  // useEffect(() => {
  //   calculateHeight();
  // }, [userMessage]);

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
