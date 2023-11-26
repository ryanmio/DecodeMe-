import React, { useState } from 'react';
import { ScrollShadow, Button } from "@nextui-org/react";

export default function ChatWithScript({ isOpen, onClose, codeSnippet }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    // Call the new Firebase Cloud Function and update chatHistory
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', height: '400px', zIndex: 1000, display: isOpen ? 'block' : 'none', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>Chat with Script</div>
      <ScrollShadow style={{ height: 'calc(100% - 60px)', overflowY: 'scroll' }}>
        {/* Map through chatHistory and display each message */}
      </ScrollShadow>
      <form onSubmit={handleChatSubmit} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input 
          type="text" 
          value={userMessage} 
          onChange={e => setUserMessage(e.target.value)} 
          placeholder="Type your message here..."
          style={{ flex: 1, marginRight: '10px' }}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}