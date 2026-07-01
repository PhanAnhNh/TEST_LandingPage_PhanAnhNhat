import React from 'react';
import '../css/feature.css';

const Features = () => {
  const featuresData = [
    { icon: "🔮", title: "M2 chip", desc: "Powerful 8-core CPU and 10-core GPU for unbelievable speed." },
    { icon: "💻", title: "Liquid Retina Display", desc: "Vibrant 11-inch display with P3 wide color and True Tone." },
    { icon: "✏️", title: "Apple Pencil Pro", desc: "Sketch, take notes, and create with precision and pixel-perfect accuracy." },
    { icon: "🔋", title: "All-day Battery Life", desc: "Stay productive and creative with up to 10 hours of battery life." }
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="features-header">
          <div>
            <span className="section-tag">FEATURES</span>
            <h2>Everything you love.<br />Even more to explore.</h2>
          </div>
          <a href="#explore" className="explore-link">Explore all features ➔</a>
        </div>

        <div className="features-grid">
          {featuresData.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="card-icon">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;