import React from 'react';
import './footer.css';
import appleLogo from '../../assets/iconapple.webp';

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop and Learn",
      links: ["Mac", "iPad", "iPhone", "Watch", "Accessories", "AirPods", "AirTag"]
    },
    {
      title: "Account",
      links: ["Manage Your Apple ID", "Apple Store Account", "iCloud.com", "Apple One"]
    },
    {
      title: "Apple Store",
      links: ["Find a Store", "Genius Bar", "Today at Apple", "Apple Camp", "Order Status"]
    },
    {
      title: "For Business",
      links: ["Apple and Business", "Shop for Business", "Apple for Education"]
    },
    {
      title: "Support",
      links: ["Support Center", "Apple Care+", "Contact Us", "System Status"]
    }
  ];

  return (
    <footer className="apple-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-links-grid">
            {footerLinks.map((section, index) => (
              <div key={index} className="footer-column">
                <h3>{section.title}</h3>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i}><a href={`#${link.replace(/\s+/g, '-').toLowerCase()}`}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-brand">
              <img src={appleLogo} alt="Apple Logo" className="footer-logo" />
              <span className="footer-copyright">© 2026 Apple Inc. All rights reserved.</span>
            </div>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span className="footer-separator">|</span>
              <a href="#terms">Terms of Use</a>
              <span className="footer-separator">|</span>
              <a href="#sales">Sales Policy</a>
              <span className="footer-separator">|</span>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;