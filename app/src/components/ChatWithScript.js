import React, { useState, useEffect, useRef } from 'react';
import { ScrollShadow, Textarea, Button as NextUIButton, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Listbox, ListboxItem } from "@nextui-org/react";
import { FaExpand } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import NewChatIcon from '../icons/newChatIcon';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Define your conversation starters
const conversationStarters = ["Give me a hint", "Decode this snippet", "Explain it like I'm 5"];

export default function ChatWithScript({ isOpen, onClose, codeSnippet, userId, db }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [learningLevel, setLearningLevel] = useState('intermediate');
  const [showDropdown, setShowDropdown] = useState(false);
  const textAreaRef = useRef(null);
  const chatHistoryRef = useRef(null);

  // Effect to scroll to bottom of chat history when it updates
  useEffect(() => {
    if (chatHistoryRef.current) {
      const { current } = chatHistoryRef;
      current.scrollTop = current.scrollHeight;
    }
  }, [chatHistory]);

  // Fetch learning level from Firebase when the component mounts
  useEffect(() => {
    const fetchLearningLevel = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        if (userData && userData.learningLevel) {
          setLearningLevel(userData.learningLevel);
        }
      } catch (error) {
        console.error('Failed to fetch learning level:', error);
      }
    };

    fetchLearningLevel();
  }, [userId, db]);

  const handleChatSubmit = async (event, messageToSend = userMessage) => {
    event.preventDefault();
    const updatedChatHistory = [...chatHistory, { role: 'user', content: messageToSend }];
    
    setChatHistory(updatedChatHistory);
    setUserMessage(''); // Clear the input field immediately after sending the message

    // Call the new Firebase Cloud Function and update chatHistory
    try {
      const response = await fetch(`https://us-central1-decodeme-1f38e.cloudfunctions.net/chatWithScript`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: codeSnippet, userMessage: messageToSend, chatHistory: updatedChatHistory, learningLevel }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Assistant message:', data.response); // Log the assistant message
      setChatHistory(prevHistory => [...prevHistory, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleNewChat = () => {
    console.log('New chat started'); // This will log to the console when the function is called
    setChatHistory([]);
  };

  const handleHeaderClick = () => {
    if (isMaximized) {
      setIsMaximized(false);
      if (!isOpen) {
        onClose(); // This will close/minimize the chat window.
      }
    } else {
      onClose(); // If it's not maximized, we just call onClose to toggle between expanded and collapsed.
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Function to handle sending a starter message
  const sendStarterMessage = (message) => {
    handleChatSubmit({ preventDefault: () => {} }, message);
  };

  // Function to update learning level in Firebase
  const updateLearningLevelInFirebase = async (level) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, { learningLevel: level });
      setLearningLevel(level);
      setShowDropdown(false); // Close the dropdown
    } catch (error) {
      console.error('Failed to update learning level:', error);
    }
  };

  const LearningLevelIndicator = () => (
    <div 
      className="learning-level-indicator" 
      onClick={() => setShowDropdown(!showDropdown)} // Toggle showDropdown state
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
          {/* Only show the learning level display if chatHistory is empty */}
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
