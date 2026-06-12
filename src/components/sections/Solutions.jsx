import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiMapPin, 
  FiCrosshair, 
  FiShield, 
  FiActivity,
  FiCpu,
  FiBox,
  FiEye,
  FiWifi
} from 'react-icons/fi';
import styles from './Solutions.module.css';

const solutionsData = [
  {
    title: "Autonomous Drones",
    description: "Surveillance, agricultural, delivery, and inspection drones powered by AI navigation.",
    icon: <FiMapPin />,
    color: "#00E5FF"
  },
  {
    title: "Robotic Arms",
    description: "High-precision manufacturing, welding, and smart factory integration systems.",
    icon: <FiCrosshair />,
    color: "#7B61FF"
  },
  {
    title: "Robotic Dogs",
    description: "Agile quadruped robots for security patrol, search & rescue, and industrial monitoring.",
    icon: <FiShield />,
    color: "#06B6D4"
  },
  {
    title: "Humanoid Robots",
    description: "Next-gen humanoid assistants for healthcare, research, and customer support.",
    icon: <FiActivity />,
    color: "#2563EB"
  },
  {
    title: "AI Automation Systems",
    description: "Intelligent process automation and machine learning integration for enterprises.",
    icon: <FiCpu />,
    color: "#00E5FF"
  },
  {
    title: "Industrial Robotics",
    description: "Smart manufacturing, production automation, and warehouse logistics robots.",
    icon: <FiBox />,
    color: "#7B61FF"
  },
  {
    title: "Computer Vision",
    description: "Real-time object detection, quality inspection, and smart monitoring algorithms.",
    icon: <FiEye />,
    color: "#06B6D4"
  },
  {
    title: "IoT & Smart Devices",
    description: "Connected sensors and intelligent infrastructure for smart cities and factories.",
    icon: <FiWifi />,
    color: "#2563EB"
  }
];

const SolutionCard = ({ data, index }) => {
  return (
    <motion.div 
      className={`${styles.card} glass-panel`}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className={styles.iconWrapper} style={{ color: data.color, boxShadow: `0 0 15px ${data.color}40` }}>
        {data.icon}
      </div>
      <h3 className={styles.cardTitle}>{data.title}</h3>
      <p className={styles.cardDescription}>{data.description}</p>
      <div className={styles.glowEffect} style={{ background: `radial-gradient(circle at top right, ${data.color}20, transparent)`}}></div>
    </motion.div>
  );
};

const Solutions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.solutions} id="solutions" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-gradient">Robotics Solutions</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Engineering the next generation of autonomous systems to solve complex industrial and societal challenges.
          </motion.p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutionsData.map((item, index) => (
            <SolutionCard key={index} data={item} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
