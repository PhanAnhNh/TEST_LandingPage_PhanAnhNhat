import React, { useState, useEffect, useRef } from 'react';
import chatService from '../../api/chatApi';
import './Chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(token);
      loadChatHistory();
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data && data.full_name) {
        setUserName(data.full_name);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const loadChatHistory = async () => {
    try {
      const data = await chatService.getHistory();
      if (data.history && data.history.length > 0) {
        const formattedMessages = data.history.map((item, index) => ({
          id: Date.now() + index,
          text: item.content || item.text,
          sender: item.role === 'user' ? 'user' : 'bot',
          timestamp: new Date(item.timestamp || Date.now()),
          context: item.context || null
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mở chat
  const handleOpenChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      const welcomeMessage = isLoggedIn && userName 
        ? `Xin chào ${userName}! Tôi là trợ lý AI của Apple Store. Tôi có thể giúp gì cho bạn? 😊`
        : 'Xin chào! Tôi là trợ lý AI của Apple Store. Tôi có thể giúp gì cho bạn? 😊';
      
      setMessages([
        {
          id: Date.now(),
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // Gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Gọi API backend
      const data = await chatService.sendMessage(userMessage.text);
      
      // Xử lý response từ AI
      let botText = data.response || 'Xin lỗi, tôi không có phản hồi.';
      
      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
        context: data.context || null,
      };
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: error.response?.data?.detail || '⚠️ Xin lỗi, tôi gặp sự cố. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // Xóa lịch sử chat
  const handleClearHistory = async () => {
    if (window.confirm('Bạn có chắc muốn xóa lịch sử chat?')) {
      try {
        await chatService.clearHistory();
        setMessages([
          {
            id: Date.now(),
            text: '🗑️ Lịch sử chat đã được xóa. Tôi sẵn sàng hỗ trợ bạn! 😊',
            sender: 'bot',
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error('Error clearing history:', error);
        alert('Không thể xóa lịch sử chat. Vui lòng thử lại!');
      }
    }
  };

  const quickReplies = [
    { text: 'iPad Air M2 mới', value: 'Cho tôi biết thông tin về iPad Air M2' },
    { text: 'So sánh sản phẩm', value: 'So sánh iPad Air và iPad Pro' },
    { text: 'Giá sản phẩm', value: 'Giá của iPad Air M2 là bao nhiêu?' },
    { text: 'Sản phẩm nổi bật', value: 'Sản phẩm Apple nổi bật nhất hiện nay?' },
  ];

  return (
    <div className="chatbot-container">
      {/* Nút mở chat */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={handleOpenChat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="chat-badge">
            <span className="chat-badge-dot"></span>
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <h3>Apple AI Assistant</h3>
                <span className="chat-status">
                  {isLoggedIn ? `👋 ${userName || 'User'}` : '🤖 Online'}
                </span>
              </div>
            </div>
            <div className="chat-header-right">
              {messages.length > 1 && (
                <button 
                  className="chat-clear-btn"
                  onClick={handleClearHistory}
                  title="Xóa lịch sử chat"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              )}
              <button className="chat-close-btn" onClick={handleCloseChat}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'} ${
                  msg.isError ? 'error-message' : ''
                }`}
              >
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  
                  {/* Hiển thị context nếu có (từ MongoDB) */}
                  {msg.context && msg.sender === 'bot' && (
                    <div className="message-context">
                      {msg.context.products && msg.context.products.length > 0 && (
                        <div className="context-products">
                          <span className="context-label">📦 Sản phẩm liên quan:</span>
                          {msg.context.products.slice(0, 2).map((product, idx) => (
                            <div key={idx} className="context-product">
                              <span className="product-name">{product.name}</span>
                              <span className="product-price">{product.price?.toLocaleString()}đ</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="message-time">{formatTime(msg.timestamp)}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot-message">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies - chỉ hiển thị khi ít tin nhắn */}
          {messages.length <= 3 && !isLoading && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => {
                    setInputMessage(reply.value);
                    setTimeout(() => handleSendMessage(new Event('submit')), 100);
                  }}
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <textarea
              ref={inputRef}
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              rows="1"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;