import React, { useState, useEffect, useRef } from 'react';
import './header.css';
import { CartModal, FavoritesModal } from '../Modals/UserModals'; 

const Header = ({ 
  onLoginClick, 
  isLoggedIn, 
  setIsLoggedIn,
  onLogout, // 👈 Nhận callback từ App
  authTrigger // 👈 Nhận trigger để biết khi nào refresh
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);          
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const dropdownRef = useRef(null);

  // Áp dụng theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Kiểm tra theme từ localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) setIsLoggedIn(true);
  }, [setIsLoggedIn, authTrigger]); // 👈 Thêm authTrigger để refresh

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    
    // 👇 Dispatch event để thông báo logout
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('authChange'));
    
    // 👇 Gọi callback từ App nếu có
    if (onLogout) {
      onLogout();
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="apple-header">
        <div className="header-container">
          <div className="header-left">
            <a href="/" className="logo-apple"></a>
            <span className="product-title">iPad Air</span>
          </div>
          
          <nav className="header-nav">
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#tech-specs">Tech Specs</a></li>
              <li><a href="#accessories">Accessories</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <div className="user-actions">
                <button className="cart-btn" aria-label="Shopping Cart" onClick={() => setIsCartOpen(true)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
                
                <div className="avatar-container" ref={dropdownRef}>
                  <img 
                    src="https://ui-avatars.com/api/?name=User&background=random" 
                    alt="User Avatar" 
                    className="avatar-icon"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  />
                  
                  {isDropdownOpen && (
                    <div className="user-dropdown">
                      <button className="dropdown-item theme-toggle" onClick={toggleTheme}>
                        <span className="theme-icon">
                          {isDarkMode ? '🌙' : '☀️'}
                        </span>
                        {isDarkMode ? 'Chế độ tối' : 'Chế độ sáng'}
                        <span className="theme-switch">
                          <span className={`switch-slider ${isDarkMode ? 'active' : ''}`}></span>
                        </span>
                      </button>
                      
                      <button className="dropdown-item" onClick={() => { setIsFavoritesOpen(true); setIsDropdownOpen(false); }}>
                        ❤️ Sản phẩm yêu thích
                      </button>
                      <button className="dropdown-item logout-text" onClick={handleLogout}>
                        🚪 Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button className="btn-blue" onClick={onLoginClick}>Login</button>
            )}
          </div>
        </div>
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
    </>
  );
};

export default Header;