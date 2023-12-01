import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton, Tooltip } from "@nextui-org/react";
import { FaExpand } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import NewChatIcon from '../icons/newChatIcon'; // Import the NewChatIcon

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const textAreaRef = useRef(null);
  const chatHistoryRef = useRef(null); // Ref for the chat history container

  // Effect to scroll to bottom of chat history when it updates
  useEffect(() => {
    if (chatHistoryRef.current) {
      const { current } = chatHistoryRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    const updatedChatHistory = [...chatHistory, { role: 'user', content: userMessage }];
    
    setChatHistory(updatedChatHistory);
    // Call the new Firebase Cloud Function and update chatHistory
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/chatWithScript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: codeSnippet, userMessage, chatHistory: updatedChatHistory }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setChatHistory(prevHistory => [...prevHistory, { role: 'assistant', content: data.response }]);
      setUserMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleNewChat = () => {
    setChatHistory([]);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div className={`chat-window ${isOpen ? 'expanded' : 'collapsed'} ${isMaximized ? 'maximized' : ''}`}>
      <div className="chat-header flex justify-between items-center">
        <div className="flex-grow cursor-pointer" onClick={onClose}>Chat with Script</div>
        <Tooltip content={isMaximized ? "Minimize" : "Maximize"} placement="top">
          <div className="cursor-pointer">
            <FaExpand className="w-6 h-6 icon-color scale-90 transform hover:scale-110 transition-transform opacity-80" onClick={toggleMaximize} />
          </div>
        </Tooltip>
        <Tooltip content="New Chat" placement="top">
          <div className="cursor-pointer">
          <NewChatIcon className="w-8 h-8 icon-color transform hover:scale-110 transition-transform opacity-80" onClick={handleNewChat} />
          </div>
        </Tooltip>
      </div>
      {isOpen && (
        <>
          <ScrollShadow className="chat-history" ref={chatHistoryRef}>
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
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
              minRows={1}
              maxRows={3}
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
