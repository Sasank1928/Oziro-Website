import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiSettings, 
  FiHeart, 
  FiCloudRain, 
  FiTruck, 
  FiShield, 
  FiBookOpen, 
  FiHome, 
  FiZap, 
  FiShoppingCart 
} from 'react-icons/fi';
import styles from './Industries.module.css';

const industriesData = [
  { name: "Manufacturing", icon: <FiSettings /> },
  { name: "Healthcare", icon: <FiHeart /> },
  { name: "Agriculture", icon: <FiCloudRain /> },
  { name: "Logistics", icon: <FiTruck /> },
  { name: "Defense", icon: <FiShield /> },
  { name: "Education", icon: <FiBookOpen /> },
  { name: "Smart Cities", icon: <FiHome /> },
  { name: "Energy", icon: <FiZap /> },
  { name: "Retail", icon: <FiShoppingCart /> }
];

const Industries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className={styles.industries} id="industries" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Industries <span className="text-gradient">We Serve</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transforming every sector with customized AI and robotics solutions.
          </motion.p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {industriesData.map((industry, index) => (
            <motion.div key={index} variants={itemVariants} className={`${styles.card} glass-panel`}>
              <div className={styles.icon}>{industry.icon}</div>
              <h3 className={styles.name}>{industry.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
