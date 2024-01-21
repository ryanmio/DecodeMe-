// hooks/useChat.js
import { useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore'; // Import required Firestore functions

const useChat = (db, userId) => {
  const chatHistoryRef = useRef(null);
  
  if (!chatHistoryRef.current) {
    chatHistoryRef.current = []; // Initialize with an empty array or fetched chat history
  }
  
  const [chatHistory, setChatHistory] = useState(chatHistoryRef.current);
  console.log('useChat - chatHistory initialized:', chatHistory); // Log at Hook Initialization
  const [learningLevel, setLearningLevel] = useState('intermediate');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const handleMessageSubmit = async (messageToSend, currentChatHistory, selectedScript) => {
    setIsAssistantTyping(true);
  
    try {
      const requestBody = JSON.stringify({
        script: JSON.stringify(selectedScript), // Stringify the script object
        userMessage: messageToSend,
        chatHistory: currentChatHistory || [], // Ensure chatHistory is an array
        learningLevel,
        userId,
      }); 

      const response = await fetch('https://us-central1-decodeme-1f38e.cloudfunctions.net/chatWithScript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
  
      console.log('handleMessageSubmit - fetch response data:', data);
  
      if (data && data.response) {
        const newMessage = { role: 'assistant', content: data.response };
        const newChatHistory = [...currentChatHistory, newMessage];
        setChatHistory(newChatHistory);
        return newChatHistory;
      } else {
        // Handle the case where the API response is not as expected
        console.error('Invalid API response', data);
        return currentChatHistory; // Return the current state if the API response is invalid
      }
    } catch (error) {
      console.error('handleMessageSubmit - error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsAssistantTyping(false);
    }
  };  

  const handleNewChat = () => {
    setChatHistory([]);
  };

  const handleLearningLevelChange = async (newLevel) => {
    if (userId && db) {
      try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, { learningLevel: newLevel });
        setLearningLevel(newLevel);
      } catch (error) {
        alert('Failed to update learning level. Please try again.');
      }
    }
  };

  console.log('useChat - chatHistory before return:', chatHistory); // Log at Hook Return
  return {
    chatHistory,
    setChatHistory,
    learningLevel,
    isAssistantTyping,
    handleMessageSubmit,
    handleNewChat,
    handleLearningLevelChange,
  };
};

export default useChat;
