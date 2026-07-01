import React from 'react';
import '../css/technical.css';
import ipads from '../assets/ipad1.png';
import ipad from '../assets/ipad2.png';

const TechSpecs = () => {
  const specs = [
    { label: "Chip", val: "Apple M2 chip" },
    { label: "Display", val: "11-inch Liquid Retina Display 2360 x 1640 pixels" },
    { label: "Storage", val: "128GB / 256GB / 512GB / 1TB" },
    { label: "Camera", val: "12MP Wide back camera 12MP Ultra Wide front camera" },
    { label: "Connectivity", val: "Wi-Fi 6E, Bluetooth 5.3" },
    { label: "Battery", val: "Up to 10 hours of web browsing" },
    { label: "Touch ID", val: "Top button with Touch ID" },
    { label: "Weight", val: "462 g (Wi-Fi model)" }
  ];

  return (
    <>
      <section id="tech-specs" className="specs-section">
        <div className="specs-container">
          <div className="specs-header">
            <span className="section-tag">TECH SPECS</span>
            <h2 className="specs-title">Technical Specifications</h2>
          </div>
          
          <div className="specs-layout">
            <div className="specs-grid">
              {specs.map((item, idx) => (
                <div key={idx} className="spec-row">
                  <span className="spec-label">{item.label}</span>
                  <span className="spec-value">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="specs-image-wrapper">
              <div className="specs-image-mockup">
                <img src={ipads} alt="iPad Air Device" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in the loop section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <div className="image-wrapper">
                  <img src={ipad} alt="iPad Air Device" className="form-image" />
            </div>
            <div className="newsletter-text">
              <h2 className="newsletter-title">Stay in the loop.</h2>
              <p className="newsletter-desc">
                Be the first to know about new products, updates, and exclusive offers.
              </p>
            </div>
            <div className="newsletter-form-wrapper">
              <form className="newsletter-form">
                
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="email-input"
                  />
                  <button type="submit" className="subscribe-btn">
                    Subscribe
                  </button>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" className="checkbox-input" />
                    <span className="checkmark"></span>
                    I agree to receive news and updates from Apple.
                  </label>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default TechSpecs;