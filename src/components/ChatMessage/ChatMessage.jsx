import React from 'react';
import './ChatMessage.css';
import { assets } from '../../assets/assets';

const ChatMessage = ({ message, isUser = false }) => {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'ai'}`}>
      <div className="message-avatar">
        <img 
          src={isUser ? assets.user_icon : assets.gemini_icon} 
          alt={isUser ? 'User' : 'Gemini'} 
        />
      </div>
      <div className="message-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage; 