import React from 'react';
import '../css/banner.css';
import banner from '../assets/banner.png';

const Banner = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <img src={banner} alt="Banner" />
      </div>
    </section>
  );
};

export default Banner;