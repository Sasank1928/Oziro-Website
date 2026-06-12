import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import styles from './Statistics.module.css';

const statsData = [
  { label: "Projects Delivered", value: 100, suffix: "+" },
  { label: "Robotics Solutions", value: 50, suffix: "+" },
  { label: "AI Products", value: 20, suffix: "+" },
  { label: "Industry Partnerships", value: 15, suffix: "+" },
  { label: "Automation Hours", value: 1000, suffix: "+" }
];

const Counter = ({ from, to, suffix }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className={styles.statistics} id="statistics" ref={ref}>
      <div className={styles.container}>
        <motion.div 
          className={styles.grid}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <h3 className={styles.number}>
                <Counter from={0} to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className={styles.label}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
