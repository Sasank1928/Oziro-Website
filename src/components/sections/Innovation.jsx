import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Innovation.module.css';

const timelineData = [
  {
    year: "Phase 1",
    title: "AI Research Foundation",
    description: "Establishing core neural networks, deep learning models, and cognitive architectures for autonomous decision making."
  },
  {
    year: "Phase 2",
    title: "Robotics Hardware Prototyping",
    description: "Development of advanced actuators, sensor fusion techniques, and first-generation humanoid joints."
  },
  {
    year: "Phase 3",
    title: "Automation Labs Integration",
    description: "Testing intelligent robotic arms and drones within simulated smart-factory environments."
  },
  {
    year: "Phase 4",
    title: "Future Technologies Sandbox",
    description: "Pioneering quantum computing applications for robotics and real-time global fleet orchestration."
  },
  {
    year: "Phase 5",
    title: "Global Product Deployment",
    description: "Scaling autonomous enterprise solutions across manufacturing, healthcare, and defense sectors worldwide."
  }
];

const Innovation = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (cardRefs.current.length === 0) return;
      
      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestIndex = null;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    // Run initially to set the correct active card on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const currentActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <section className={styles.innovation} id="innovation">
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            Innovation & <span className="text-gradient">Research</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mapping the future trajectory of intelligent systems.
          </motion.p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line}></div>
          {timelineData.map((item, index) => {
            const isDimmed = currentActive !== null && currentActive !== index;
            const isActive = currentActive === index;

            return (
              <motion.div 
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.dot}></div>
                <motion.div 
                  className={`${styles.content} glass-panel`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    opacity: isDimmed ? 0.35 : 1,
                    scale: isActive ? 1.03 : 1,
                    y: isActive ? -5 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <span className={styles.year}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Innovation;
