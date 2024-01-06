// components/ChatWithScript.js
import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Listbox, ListboxItem } from "@nextui-org/react";
import { FaExpand } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import NewChatIcon from '../app/src/icons/newChatIcon';
import TypingAnimation from './TypingAnimation';
import { useAuth } from '../contexts/AuthContext'; // Added useAuth import

export default function ChatWithScript({ isOpen, onClose, codeSnippet, selectedScript, db, handleMessageSubmit, conversationStarters, learningLevel, onLearningLevelChange, chatHistory, setChatHistory, onNewChat, capExceeded }) {

  const { user } = useAuth(); // Use useAuth hook to get user

  const [userMessage, setUserMessage] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const { current } = chatHistoryRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [chatHistory]);

  function handleError(error) {
    alert('An error occurred. Please try again.');
    console.error(error);
  }

  const handleChatSubmit = async (event, messageToSend = userMessage) => { 
    event.preventDefault();
    const updatedChatHistory = [...chatHistory, { role: 'user', content: messageToSend }];
    setChatHistory(updatedChatHistory);
    setUserMessage('');
    setIsAssistantTyping(true);
    try {
      const scriptToUse = selectedScript || codeSnippet; // Use selectedScript if available, otherwise use codeSnippet
      const newChatHistory = await handleMessageSubmit(messageToSend, updatedChatHistory, scriptToUse);
      setChatHistory(newChatHistory);
    } catch (error) {
      handleError(error);
    } finally {
      setIsAssistantTyping(false);
    }
  };
  
  const handleNewChat = () => {
    setChatHistory([]);
    onNewChat();
  };

  const handleHeaderClick = () => {
    if (isMaximized && !isOpen) onClose();
    else onClose();
    setIsMaximized(false);
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const sendStarterMessage = (starter) => {
    handleChatSubmit({ preventDefault: () => { } }, starter); // Pass the starter message directly to handleChatSubmit
  };

  const updateLearningLevelInFirebase = async (level) => {
    try {
      onLearningLevelChange(level);
      setShowDropdown(false);
    } catch (error) {
      handleError(error);
    }
  };

  const LearningLevelIndicator = () => (
    <div
      className="learning-level-indicator"
      onClick={() => setShowDropdown(!showDropdown)}
      style={{ cursor: 'pointer' }}
    >
      <span style={{ fontWeight: 'normal', color: '#666' }}>Learning Level:</span>
      <span
        style={{ textDecoration: 'underline dotted', color: '#333', marginLeft: '5px', fontWeight: 'bold' }}
      >
        {learningLevel}
      </span>
    </div>
  );

  const LearningLevelDropdown = () => (
    <Listbox
      className="listbox"
      aria-label="Learning Level"
      value={learningLevel}
      isOpen={showDropdown}
      onOpenChange={setShowDropdown}
      onChange={value => updateLearningLevelInFirebase(value)}
    >
      <ListboxItem className="listbox-item" value="beginner" onPress={() => updateLearningLevelInFirebase('beginner')}>Beginner</ListboxItem>
      <ListboxItem className="listbox-item" value="intermediate" onPress={() => updateLearningLevelInFirebase('intermediate')}>Intermediate</ListboxItem>
      <ListboxItem className="listbox-item" value="expert" onPress={() => updateLearningLevelInFirebase('expert')}>Expert</ListboxItem>
    </Listbox>
  );

  const LearningLevelSelector = () => (
    <div className="learning-level-selector">
      <LearningLevelIndicator />
      {showDropdown && <LearningLevelDropdown />}
    </div>
  );

  return (
    <div className={`chat-window ${isOpen ? 'expanded' : 'collapsed'} ${isMaximized ? 'maximized' : ''}`}>
      <div className="chat-header flex justify-between items-center" onClick={handleHeaderClick}>
        <div className="flex-grow cursor-pointer">Virtual Coach</div>
        {isOpen && (
          <>
            <Tooltip content={isMaximized ? "Minimize" : "Maximize"} placement="top">
              <div className="cursor-pointer">
                <FaExpand className="w-6 h-6 icon-color scale-90 transform hover:scale-110 transition-transform opacity-80" onClick={toggleMaximize} />
              </div>
            </Tooltip>
            <Tooltip content="New Chat" placement="top">
              <div className="cursor-pointer icon-container" onClick={handleNewChat}>
                <NewChatIcon className="w-8 h-8 icon-color transform hover:scale-110 transition-transform opacity-80" />
              </div>
            </Tooltip>
          </>
        )}
      </div>
      {isOpen && (
        <>
          {chatHistory.length === 0 && (
            <div className="flex justify-between items-center p-2">
              <LearningLevelSelector />
            </div>
          )}
          <ScrollShadow className="chat-history" ref={chatHistoryRef}>
            <div className="system-message">
              <ReactMarkdown className="message">
                {selectedScript && typeof selectedScript === 'object' ? selectedScript.question : (codeSnippet && typeof codeSnippet === 'object' ? codeSnippet.question : (selectedScript || codeSnippet || ''))}
              </ReactMarkdown>
            </div>
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
            {isAssistantTyping && <TypingAnimation />}
          </ScrollShadow>
          {chatHistory.length === 0 && (
            <div className="conversation-starters">
              {conversationStarters.map((starter, index) => (
                <div key={index} className="starter-bubble" onClick={() => sendStarterMessage(starter)}>
                  {starter}
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleChatSubmit} className="chat-input">
            <Textarea
              value={userMessage}
              onChange={e => setUserMessage(e.target.value)}
              placeholder={capExceeded ? "OpenAI Limit Exceeded" : "Your message..."}
              className="message-input"
              minRows={1}
              maxRows={3}
              disabled={capExceeded}
            />
            <NextUIButton
              type="submit"
              className={`send-button ${capExceeded ? 'disabled' : ''}`}
              auto
              size="small"
              color="primary"
              bordered
              disabled={capExceeded}
            >
              <span>Send</span>
            </NextUIButton>
          </form>
        </>
      )}
    </div>
  );
}
