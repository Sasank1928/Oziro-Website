import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './PopularProducts.module.css';
import ProductScene from '../3d/ProductScene';
import humanoidAvatar from '../../assets/humanoid_avatar.png';
import droneAvatar from '../../assets/drone_avatar.png';
import armAvatar from '../../assets/arm_avatar.png';

const avatars = {
  humanoid: humanoidAvatar,
  drone: droneAvatar,
  arm: armAvatar,
};

const popularItems = [
  {
    id: 'humanoid',
    name: 'Humanoid Assistant Robot',
    tagline: 'Cognitive Assistant',
    desc: 'Equipped with 32 degrees of freedom, stereo depth vision, and force-sensitive hands, designed to assist on mixed-assembly lines and customer reception.',
  },
  {
    id: 'drone',
    name: 'Surveillance & Inspection Drone',
    tagline: 'Aerial Recon & Inspector',
    desc: 'Weather-sealed quadcopter platform utilizing edge AI analytics to detect anomalies, cracks, and security breaches over active perimeters.',
  },
  {
    id: 'arm',
    name: 'Collaborative Robotic Arm',
    tagline: '6-Axis Collaborative Arm',
    desc: 'Collaborative arm featuring zero-code hand-guided training and integrated force sensing for precision pick-and-place, machine tending, and welding.',
  }
];

const PopularProducts = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={styles.section} id="popular-products">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Trending Hardware</span>
          <h2 className={styles.title}>Popular <span className="text-gradient">Robotics platforms</span></h2>
          <p className={styles.subtitle}>Get hands-on with Oziro's most frequently deployed robotic systems.</p>
        </div>

        <div className={styles.grid}>
          {popularItems.map((item, i) => {
            return (
              <motion.div 
                key={item.id} 
                className={`${styles.card} glass-panel`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className={styles.canvasWrapper} style={{ height: '220px', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isMobile ? (
                    <img src={avatars[item.id]} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.3))' }} />
                  ) : (
                    <ProductScene productId={item.id} isThumbnail={true} />
                  )}
                </div>

                <div className={styles.content}>
                  <span className={styles.cardTag}>{item.tagline}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                  
                  <button 
                    className={styles.specsBtn}
                    onClick={() => navigate(`/products/${item.id}`)}
                  >
                    View Details & Specs &rarr;
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;

