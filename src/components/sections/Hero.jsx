import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import oziroLogo from '../../assets/new_logo.jpg';

const Hero = () => {
  const [processedLogo, setProcessedLogo] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = oziroLogo;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;
      
      const isWhite = (i) => {
        return data[i] > 230 && data[i+1] > 230 && data[i+2] > 230;
      };

      // 1. Flood fill from edges to make outer white transparent
      const visited = new Uint8Array(width * height);
      const queue = [];
      let head = 0;

      const pushIfValid = (x, y) => {
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const idx = y * width + x;
          if (visited[idx] === 0) {
             visited[idx] = 1;
             if (isWhite(idx * 4)) {
               queue.push(x, y);
             }
          }
        }
      };

      // Initialize queue with borders
      for (let x = 0; x < width; x++) {
         pushIfValid(x, 0);
         pushIfValid(x, height - 1);
      }
      for (let y = 0; y < height; y++) {
         pushIfValid(0, y);
         pushIfValid(width - 1, y);
      }

      while (head < queue.length) {
         const x = queue[head++];
         const y = queue[head++];
         
         const i = (y * width + x) * 4;
         
         // Smooth alpha for anti-aliasing edge pixels
         const maxVal = Math.max(data[i], data[i+1], data[i+2]);
         if (maxVal > 245) {
           data[i+3] = 0;
         } else {
           data[i+3] = Math.min(data[i+3], 255 - (maxVal - 230) * 10);
         }
         
         // Add neighbors
         pushIfValid(x + 1, y);
         pushIfValid(x - 1, y);
         pushIfValid(x, y + 1);
         pushIfValid(x, y - 1);
      }

      // 2. Change text to white and clear remaining white in bottom 25% (holes in letters)
      for (let y = Math.floor(height * 0.72); y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = data[i], g = data[i+1], b = data[i+2];
          
          // Clear remaining white
          if (r > 200 && g > 200 && b > 200) {
             const maxVal = Math.max(r, g, b);
             if (maxVal > 240) data[i+3] = 0;
             else data[i+3] = Math.min(data[i+3], 255 - (maxVal - 200) * 4);
          }
          // Change dark blue text to white
          else if (data[i+3] > 0 && r < 150 && g < 150) {
             data[i] = 255;
             data[i+1] = 255;
             data[i+2] = 255;
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      setProcessedLogo(canvas.toDataURL());
    };
  }, []);

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.canvasContainer}>
        {processedLogo ? (
          <img src={processedLogo} alt="Oziro Tech Logo" className={styles.heroImage} />
        ) : (
          <img src={oziroLogo} alt="Oziro Tech Logo" className={styles.heroImage} style={{ opacity: 0 }} />
        )}
      </div>
      
      <div className={styles.content}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1 
            className={styles.headline}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Engineering the <br />
            <span className="text-gradient">Future of Robotics</span> & <br />
            Artificial Intelligence
          </motion.h1>
          
          <motion.p 
            className={styles.subheadline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Oziro Tech AI World Pvt Ltd develops intelligent robotic systems, 
            autonomous drones, industrial automation solutions, AI-powered machines, 
            and next-generation humanoid technologies.
          </motion.p>
          
          <motion.div 
            className={styles.ctaGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a 
              href="#solutions" 
              className={`${styles.btn} ${styles.primaryBtn}`}
              onClick={(e) => handleScrollTo(e, '#solutions')}
            >
              Explore Technologies
            </a>
            <a 
              href="#contact" 
              className={`${styles.btn} ${styles.outlineBtn}`}
              onClick={(e) => handleScrollTo(e, '#contact')}
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={styles.mouse}
        >
          <div className={styles.wheel}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
