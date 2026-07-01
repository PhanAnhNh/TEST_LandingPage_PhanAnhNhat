import React from 'react';
import '../css/banner.css';
import banner from '../assets/banner.webp';

const Banner = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <img src={banner} alt="Apple iPad Air M2" />
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