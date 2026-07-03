// src/components/ChatBot/ChatBot.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import chatService from '../../api/chatApi';
import axiosClient from '../../api/api';
import './Chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const initChat = async () => {
      const token = localStorage.getItem('access_token');
      console.log(' Token found:', !!token);
      console.log(' API Base URL:', import.meta.env.VITE_API_BASE_URL);
      
      if (token) {
        setIsLoggedIn(true);
        // Fetch user info và chat history song song
        await Promise.all([
          fetchUserInfo(),
          loadChatHistory()
        ]);
      }
      setIsInitialized(true);
    };

    initChat();
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      console.log(' Fetching user info...');
      const response = await axiosClient.get('/auth/me');
      console.log(' User data:', response.data);
      
      if (response.data && response.data.full_name) {
        setUserName(response.data.full_name);
      }
    } catch (error) {
      console.error(' Error fetching user info:', error.message);
      // Nếu lỗi 401, xóa token
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Load chat history
  const loadChatHistory = useCallback(async () => {
    try {
      const data = await chatService.getHistory();
      console.log(' Chat history:', data);
      
      if (data && data.history && data.history.length > 0) {
        const formattedMessages = data.history.map((item, index) => ({
          id: Date.now() + index,
          text: item.content || item.text || '',
          sender: item.role === 'user' ? 'user' : 'bot',
          timestamp: new Date(item.timestamp || Date.now()),
          context: item.context || null
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
      }
    }
  }, []);

  // Scroll to bottom khi messages thay đổi
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  // Mở chat
  const handleOpenChat = useCallback(() => {
    setIsOpen(true);
    if (messages.length === 0 && isInitialized) {
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
  }, [messages.length, isInitialized, isLoggedIn, userName]);

  // Đóng chat
  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Gửi tin nhắn
  const handleSendMessage = useCallback(async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
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
      const data = await chatService.sendMessage(userMessage.text);
      
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
      console.error(' Chat error:', error);
      let errorMessage = ' Xin lỗi, tôi gặp sự cố. Vui lòng thử lại sau.';
      
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = ' Kết nối bị timeout. Vui lòng thử lại.';
      } else if (!error.response) {
        errorMessage = ' Không thể kết nối đến server. Vui lòng kiểm tra kết nối.';
      } else if (error.response?.status === 401) {
        errorMessage = ' Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      const errorMsg = {
        id: Date.now() + 1,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [inputMessage, isLoading]);

  // Xử lý key press
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  }, [handleSendMessage]);

  // Format time
  const formatTime = useCallback((date) => {
    if (!date) return '';
    try {
      return new Date(date).toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '';
    }
  }, []);

  // Xóa lịch sử
  const handleClearHistory = useCallback(async () => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch sử chat?')) return;
    
    try {
      await chatService.clearHistory();
      setMessages([
        {
          id: Date.now(),
          text: ' Lịch sử chat đã được xóa. Tôi sẵn sàng hỗ trợ bạn! ',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error(' Error clearing history:', error);
      if (error.response?.status === 401) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
      } else {
        alert('Không thể xóa lịch sử chat. Vui lòng thử lại!');
      }
    }
  }, []);

  // Quick replies
  const quickReplies = [
    { text: 'iPad Air M2 mới', value: 'Cho tôi biết thông tin về iPad Air M2' },
    { text: 'So sánh sản phẩm', value: 'So sánh iPad Air và iPad Pro' },
    { text: 'Giá sản phẩm', value: 'Giá của iPad Air M2 là bao nhiêu?' },
    { text: 'Sản phẩm nổi bật', value: 'Sản phẩm Apple nổi bật nhất hiện nay?' },
  ];

  // Xử lý quick reply
  const handleQuickReply = useCallback((value) => {
    setInputMessage(value);
    const fakeEvent = { preventDefault: () => {} };
    setTimeout(() => handleSendMessage(fakeEvent), 100);
  }, [handleSendMessage]);

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button 
          className="chat-toggle-btn" 
          onClick={handleOpenChat}
          aria-label="Mở chat"
          title="Mở trợ lý AI"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="chat-badge">
            <span className="chat-badge-dot"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
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
                  {isLoggedIn && userName ? `👋 ${userName}` : '🤖 Online'}
                </span>
              </div>
            </div>
            <div className="chat-header-right">
              {messages.length > 1 && (
                <button 
                  className="chat-clear-btn"
                  onClick={handleClearHistory}
                  title="Xóa lịch sử chat"
                  aria-label="Xóa lịch sử chat"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                </button>
              )}
              <button 
                className="chat-close-btn" 
                onClick={handleCloseChat}
                aria-label="Đóng chat"
                title="Đóng chat"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

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
                  
                  {msg.context && msg.sender === 'bot' && msg.context.products && msg.context.products.length > 0 && (
                    <div className="message-context">
                      <div className="context-products">
                        <span className="context-label">📦 Sản phẩm liên quan:</span>
                        {msg.context.products.slice(0, 2).map((product, idx) => (
                          <div key={idx} className="context-product">
                            <span className="product-name">{product.name}</span>
                            <span className="product-price">
                              {product.price ? `${product.price.toLocaleString()}đ` : ''}
                            </span>
                          </div>
                        ))}
                      </div>
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

          {messages.length <= 3 && !isLoading && isInitialized && (
            <div className="quick-replies">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply.value)}
                  type="button"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          )}

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
              aria-label="Nhập tin nhắn"
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!inputMessage.trim() || isLoading}
              aria-label="Gửi tin nhắn"
              title="Gửi tin nhắn"
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