import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ProductsPage.module.css';

// Import high-fidelity static image assets
import humanoidAvatar from '../assets/humanoid_avatar.png';
import droneAvatar from '../assets/drone_avatar.png';
import dogAvatar from '../assets/dog_avatar.png';
import armAvatar from '../assets/arm_avatar.png';
import agvAvatar from '../assets/agv_avatar.png';
import carAvatar from '../assets/car_avatar.png';
import hologramAvatar from '../assets/hologram_avatar.png';

const products = [
  { id: 'humanoid', name: 'Oziro Humanoid V1', spec: 'Next-gen bipedal humanoid assistant', image: humanoidAvatar },
  { id: 'dog', name: 'QuadDog Alpha', spec: 'All-terrain quadruped robotic platform', image: dogAvatar },
  { id: 'car', name: 'Oziro CyberRover V1', spec: 'High-speed autonomous tactical rover car', image: carAvatar },
  { id: 'agv', name: 'AutoBot AGV', spec: 'Heavy-duty autonomous logistics vehicle', image: agvAvatar },
  { id: 'arm', name: 'RoboArm Flex', spec: 'High-precision 6-axis collaborative arm', image: armAvatar },
  { id: 'drone', name: 'AeroDrone X', spec: 'Autonomous aerial surveillance & inspection', image: droneAvatar },
  { id: 'hologram', name: 'HoloCore Projector', spec: 'Interactive volumetric display projector', image: hologramAvatar },
];

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Oziro Catalog</span>
          <h1 className={styles.title}>Robotics & <span className="text-gradient">AI Platforms</span></h1>
          <p className={styles.subtitle}>Explore our state-of-the-art enterprise-ready autonomous hardware solutions.</p>
        </div>

        <div className={styles.productsGrid}>
          {products.map((p, idx) => (
            <motion.div 
              key={p.id} 
              className={`${styles.productCard} glass-panel`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.cardImageWrapper}>
                <img src={p.image} alt={p.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                <p className={styles.cardSpec}>{p.spec}</p>
                <button 
                  className={styles.detailsBtn}
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
