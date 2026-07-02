// components/Scrollytelling/SectionDivider.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './sectionDivider.css';

const SectionDivider = ({ 
  title, 
  subtitle, 
  bgColor = '#f5f5f7',  // Mặc định màu nền
  textColor = '#1d1d1f'  // Mặc định màu chữ
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section 
      className="section-divider" 
      ref={ref} 
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="divider-content">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ color: textColor }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ color: textColor === '#1d1d1f' ? '#6e6e73' : 'rgba(255,255,255,0.8)' }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          className="divider-line"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          style={{ 
            background: textColor === '#1d1d1f' 
              ? 'linear-gradient(90deg, #007aff, #5856d6)' 
              : 'linear-gradient(90deg, #0a84ff, #409cff)'
          }}
        />
      </div>
    </section>
  );
};

export default SectionDivider;