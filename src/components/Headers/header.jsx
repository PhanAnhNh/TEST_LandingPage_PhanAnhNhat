import React from 'react';
import './header.css';

const Header = () => {
  return (
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
          <button className="btn-blue">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;