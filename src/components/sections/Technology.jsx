import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Technology.module.css';

const technologies = [
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Autonomous Navigation",
  "Edge Computing",
  "Industrial Automation",
  "Robotics Engineering",
  "Digital Twins",
  "IoT Systems",
  "Smart Sensors"
];

const Technology = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.technology} id="technology" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Core <span className="text-gradient">Technologies</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our ecosystem is built upon cutting-edge research and proprietary tech stacks.
          </motion.p>
        </div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.listContainer}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <ul className={styles.techList}>
              {technologies.map((tech, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={styles.techItem}
                >
                  <span className={styles.techDot}></span>
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
