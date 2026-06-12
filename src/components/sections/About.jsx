import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';
import { FiTarget, FiCrosshair, FiCpu } from 'react-icons/fi';
import humanoidAvatar from '../../assets/humanoid_avatar.png';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          <motion.div 
            className={styles.canvasContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.glowBg}></div>
            <img src={humanoidAvatar} alt="Oziro Humanoid Robot Model" className={styles.aboutImage} />
          </motion.div>

          <motion.div 
            className={styles.content}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className={styles.title}>
              About <span className="text-gradient">Oziro Tech</span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className={styles.description}>
              At Oziro Tech AI World Pvt Ltd, we are pioneering the intersection of robotics and artificial intelligence. 
              Our mission is to build intelligent systems that elevate human potential and automate the impossible.
            </motion.p>
            
            <div className={styles.featuresList}>
              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconBox}><FiTarget /></div>
                <div>
                  <h3>Company Vision</h3>
                  <p>To be the global benchmark in autonomous systems and AI-driven robotics, creating a smarter, safer world.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconBox}><FiCrosshair /></div>
                <div>
                  <h3>Mission</h3>
                  <p>Delivering cutting-edge automation solutions that drive efficiency, productivity, and safety across all industries.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className={styles.featureItem}>
                <div className={styles.iconBox}><FiCpu /></div>
                <div>
                  <h3>R&D Excellence</h3>
                  <p>Continuous innovation in neural networks, computer vision, and mechanical design to push the boundaries of what machines can do.</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants}>
              <button className={`${styles.btn} glass-panel`}>
                View Technology Roadmap
              </button>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
