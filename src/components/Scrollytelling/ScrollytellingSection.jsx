// components/Scrollytelling/ScrollytellingSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import './scrollytelling.css';

const ScrollytellingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  
  const scenes = [
    {
      id: 1,
      title: "M2 Chip. Tốc độ vượt trội.",
      desc: "iPad Air được trang bị chip M2 với CPU 8 nhân và GPU 10 nhân, mang lại hiệu suất đột phá cho mọi tác vụ.",
      icon: "🚀",
      textColor: "#000000" 
    },
    {
      id: 2,
      title: "Liquid Retina Display. Sắc nét mọi góc nhìn.",
      desc: "Màn hình Liquid Retina với công nghệ P3 wide color và True Tone, cho trải nghiệm hình ảnh sống động như thật.",
      icon: "✨",
      textColor: "#000000"
    },
    {
      id: 3,
      title: "Apple Pencil Pro. Sáng tạo không giới hạn.",
      desc: "Cảm biến áp lực và độ nghiêng chính xác, biến iPad Air thành công cụ sáng tạo hoàn hảo.",
      icon: "✏️",
      textColor: "#000000"
    },
    {
      id: 4,
      title: "iPadOS. Làm nhiều hơn với iPad Air.",
      desc: "Đa nhiệm mượt mà, ứng dụng chuyên nghiệp và hệ sinh thái mạnh mẽ giúp bạn làm việc hiệu quả.",
      icon: "📱",
      textColor: "#000000"
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [20, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const index = Math.min(Math.floor(value * scenes.length), scenes.length - 1);
      if (index >= 0) {
        setActiveIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, scenes.length]);

  const renderIpadScreen = () => {
    switch(activeIndex) {
      case 0:
        return (
          <div className="screen-content chip-scene">
            <div className="m2-chip">
              <span>M2</span>
              <div className="chip-glow"></div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="screen-content retina-scene">
            <div className="fluid-gradient"></div>
          </div>
        );
      case 2:
        return (
          <div className="screen-content pencil-scene">
            <svg className="drawing-line" viewBox="0 0 200 200">
              <path d="M20,150 Q60,40 120,120 T180,30" fill="none" stroke="url(#pencilGrad)" strokeWidth="5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="pencilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4500" />
                  <stop offset="100%" stopColor="#ff007f" />
                </linearGradient>
              </defs>
            </svg>
            <div className="virtual-pencil"></div>
          </div>
        );
      case 3:
        return (
          <div className="screen-content ipados-scene">
            <div className="dock">
              <div className="dock-item"></div>
              <div className="dock-item"></div>
              <div className="dock-item"></div>
            </div>
            <div className="app-window win-1"></div>
            <div className="app-window win-2"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="scrollytelling-section" ref={containerRef}>
      <div className="scrollytelling-bg">
        <motion.div 
          className="parallax-ipad"
          style={{ y: parallaxY, opacity: opacity }}
        >
          <div className="ipad-device-frame">
            <div className="ipad-camera"></div>
            <div className="ipad-inner-screen">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {renderIpadScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scrollytelling-content" ref={ref}>
        <div className="progress-tracker">
          {scenes.map((scene, index) => (
            <div 
              key={scene.id}
              className={`progress-dot ${index <= activeIndex ? 'active' : ''}`}
            />
          ))}
        </div>

        {scenes.map((scene, index) => (
          <motion.div
            key={scene.id}
            className={`scene ${index === activeIndex ? 'active' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: index === activeIndex ? 1 : 0,
              y: index === activeIndex ? 0 : 30,
            }}
            transition={{ duration: 0.4 }}
            style={{ color: scene.textColor }}
          >
            <div className="scene-content">
              <div className="scene-icon">{scene.icon}</div>
              <h2>{scene.title}</h2>
              <p>{scene.desc}</p>
              <div className="scene-cta">
                <button className="btn-learn-more">Tìm hiểu thêm →</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ScrollytellingSection;