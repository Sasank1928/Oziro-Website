import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Contact.module.css';
import hologramAvatar from '../../assets/hologram_avatar.png';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data
    alert('Thank you for contacting Oziro Tech AI World Pvt Ltd.');
  };

  return (
    <section className={styles.contact} id="contact" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Connect With <span className="text-gradient">The Future</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reach out to our engineering team to discuss enterprise automation and AI integration.
          </motion.p>
        </div>

        <div className={styles.grid}>
          <motion.div 
            className={styles.canvasContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.glowBg}></div>
            <img src={hologramAvatar} alt="Oziro Contact Assistant" className={styles.contactImage} />
          </motion.div>

          <motion.div 
            className={`${styles.formContainer} glass-panel`}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <input type="text" required placeholder="John Doe" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Company</label>
                  <input type="text" required placeholder="Enterprise Corp" />
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" required placeholder="john@example.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Message</label>
                <textarea required rows="4" placeholder="How can we help you automate?"></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
