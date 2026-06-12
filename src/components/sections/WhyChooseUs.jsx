import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './WhyChooseUs.module.css';

const features = [
  "Advanced AI Expertise",
  "Robotics Innovation",
  "Custom Engineering",
  "Enterprise Solutions",
  "Research Driven",
  "Global Standards"
];

const comparisonData = [
  { feature: "AI Model Integration", oziro: "Deep Learning & Neural Nets", others: "Basic Rule-Based Logic" },
  { feature: "Hardware Customization", oziro: "Fully Modular & Scalable", others: "Off-the-shelf components" },
  { feature: "Data Security", oziro: "Enterprise-grade Edge Encryption", others: "Cloud-dependent" },
  { feature: "Continuous Learning", oziro: "Self-optimizing algorithms", others: "Manual updates required" },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={styles.whyChoose} id="why" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose <span className="text-gradient">Oziro Tech</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We don't just build robots; we architect intelligent ecosystems that adapt, learn, and scale.
          </motion.p>
        </div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.featuresList}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3>Our Advantages</h3>
            <ul>
              {features.map((feature, idx) => (
                <li key={idx}>
                  <FiCheckCircle className={styles.icon} />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className={`${styles.comparisonTable} glass-panel`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className={styles.tableHeader}>
              <div className={styles.colFeature}>Feature</div>
              <div className={styles.colOziro}>Oziro Tech AI</div>
              <div className={styles.colOthers}>Industry Average</div>
            </div>
            
            {comparisonData.map((row, idx) => (
              <div key={idx} className={styles.tableRow}>
                <div className={styles.colFeature}>{row.feature}</div>
                <div className={styles.colOziro}>{row.oziro}</div>
                <div className={styles.colOthers}>{row.others}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
