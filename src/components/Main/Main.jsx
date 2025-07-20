import React, { useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import ChatMessage from '../ChatMessage/ChatMessage'
import { generateContent } from '../../config/gemini'

const Main = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await generateContent(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.message.includes('API key') || error.message.includes('VITE_GEMINI_API_KEY')) {
        errorMessage = 'API key error: Please check your .env file and ensure you have a valid Gemini API key.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error: Please check your internet connection and try again.';
      }
      
      setMessages(prev => [...prev, { text: errorMessage, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      
      <div className="main-container">
        {messages.length === 0 ? (
          <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="chat-messages">
            {messages.map((message, index) => (
              <ChatMessage 
                key={index} 
                message={message.text} 
                isUser={message.isUser} 
              />
            ))}
            {isLoading && (
              <div className="loading-message">
                <p>Gemini is thinking...</p>
              </div>
            )}
          </div>
        )}
        
        <div className="main-bottom">
          <div className="search-box">
            <input 
              type="text" 
              placeholder='Enter a prompt here' 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <button 
                className="send-button"
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
