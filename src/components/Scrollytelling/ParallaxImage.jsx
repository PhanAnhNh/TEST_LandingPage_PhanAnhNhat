import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './parallax.css';

const ParallaxImage = ({ src, alt, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);

  return (
    <motion.div 
      ref={ref}
      className={`parallax-image-wrapper ${className}`}
      style={{ y, scale }}
    >
      <img src={src} alt={alt} className="parallax-image" />
    </motion.div>
  );
};

export default ParallaxImage;