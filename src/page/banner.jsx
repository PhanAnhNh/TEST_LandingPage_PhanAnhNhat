import React, { useState } from 'react';
import '../css/banner.css';
import '../css/Skeleton.css';
import banner from '../assets/banner.webp';

const Banner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="banner-wrapper">

          {!imageLoaded && (
            <div className="banner-skeleton-overlay">
              <div className="skeleton"></div>
              <div className="banner-loading-icon">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="30 10">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          )}
          
          <img 
            src={banner} 
            alt="Apple iPad Air M2" 
            className={`banner-image ${imageLoaded ? 'loaded' : 'loading'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="hero-content">
          <div className="button-group">
            <button className="btn btn-buy">Buy</button>
            <button className="btn btn-watch">Watch the film ▶</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;