import React from 'react';
import './footer.css';
import appleLogo from '../../assets/iconapple.webp';

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop and Learn",
      links: ["Mac", "iPad", "iPhone", "Watch", "Accessories"]
    },
    {
      title: "Account",
      links: ["Manage Your Apple ID", "Apple Store Account", "iCloud.com"]
    },
    {
      title: "Apple Store",
      links: ["Find a Store", "Genius Bar", "Today at Apple"]
    },
    {
      title: "For Business",
      links: ["Apple and Business", "Shop for Business"]
    },
    {
      title: "Support",
      links: ["Support Center", "Apple Care+", "Contact Us"]
    }
  ];

  return (
    <footer className="apple-footer">
      <div className="footer-container">
        <div className="footer-bottom">
          <img src={appleLogo} alt="Apple Logo" className="footer-logo" />
          <p>© 2026 Apple Inc. All rights reserved.</p>
        </div>
        <div className="footer-links-grid">
          {footerLinks.map((section, index) => (
            <div key={index} className="footer-column">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}><a href={`#${link}`}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;