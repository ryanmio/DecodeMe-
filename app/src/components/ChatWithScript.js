import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Listbox, ListboxItem } from "@nextui-org/react";
import { FaExpand } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import NewChatIcon from '../icons/newChatIcon';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function ChatWithScript({ isOpen, onClose, codeSnippet, selectedScript, userId, db, handleMessageSubmit, conversationStarters, learningLevel, onLearningLevelChange, chatHistory, setChatHistory }) {

  const userMessageRef = useRef('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const textAreaRef = useRef(null);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      const { current } = chatHistoryRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    const messageToSend = userMessageRef.current;
    const updatedChatHistory = [...chatHistory, { role: 'user', content: messageToSend }];
    setChatHistory(updatedChatHistory);
    userMessageRef.current = '';
    textAreaRef.current.value = '';
    try {
      const newChatHistory = await handleMessageSubmit(messageToSend, updatedChatHistory);
      setChatHistory(newChatHistory);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  
  const handleNewChat = () => setChatHistory([]);

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMaximized(true);
    setIsMinimized(false);
  };

  const handleHeaderClick = () => {
    if (isMaximized && !isOpen) onClose();
    else onClose();
    setIsMaximized(false);
  };

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const sendStarterMessage = (message) => handleChatSubmit({ preventDefault: () => { } }, message);

  const updateLearningLevelInFirebase = async (level) => {
    try {
      onLearningLevelChange(level);
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to update learning level:', error);
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
            {chatHistory.map((message, index) => (
              <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            ))}
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
              ref={textAreaRef}
              defaultValue=""
              onChange={e => userMessageRef.current = e.target.value}
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
