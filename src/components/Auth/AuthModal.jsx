import React, { useState } from 'react';
import './authModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // State chuyển đổi giữa Đăng nhập (true) và Đăng ký (false)
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Xử lý Đăng nhập với:", { email, password });
    } else {
      console.log("Xử lý Đăng ký với:", { email, password });
    }
  };

  const handleGoogleLogin = () => {
    console.log("Xử lý Đăng nhập bằng Google");
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <span className="auth-apple-logo"></span>
          <h2>{isLogin ? 'Sign in to Account' : 'Create your Account'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Manage your account and preferences' : 'One account for all of Apple'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="auth-input"
            />
          </div>
          
          <div className="auth-input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-primary-btn">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        {/* Nút Đăng nhập Google */}
        <button className="auth-google-btn" onClick={handleGoogleLogin}>
          <svg className="google-icon" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 14.96 1 12 1 7.35 1 3.37 3.65 1.39 7.56l3.74 2.9C6.01 7.42 8.79 5.04 12 5.04z"/>
            <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.73 2.89c2.18-2.01 3.7-4.99 3.7-8.62z"/>
            <path fill="#FBBC05" d="M5.13 14.74c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.39 7.26C.5 9.05 0 11.02 0 13s.5 3.95 1.39 5.74l3.74-2.82z"/>
            <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.73-2.89c-1.11.75-2.53 1.19-4.23 1.19-3.21 0-5.99-2.38-6.87-5.42l-3.74 2.9C3.37 19.35 7.35 23 12 23z"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-toggle">
          {isLogin ? (
            <p>Don't have an Account? <span onClick={() => setIsLogin(false)}>Create yours now.</span></p>
          ) : (
            <p>Already have an Account? <span onClick={() => setIsLogin(true)}>Sign in here.</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;