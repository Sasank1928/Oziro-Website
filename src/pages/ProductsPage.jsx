import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [activeProduct, setActiveProduct] = useState(0);
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Oziro Catalog</span>
          <h1 className={styles.title}>Robotics & <span className="text-gradient">AI Platforms</span></h1>
          <p className={styles.subtitle}>Explore our state-of-the-art enterprise-ready autonomous hardware solutions.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.sidebar}>
            {products.map((p, idx) => (
              <button 
                key={p.id} 
                className={`${styles.navBtn} ${activeProduct === idx ? styles.active : ''}`}
                onClick={() => setActiveProduct(idx)}
              >
                <h4>{p.name}</h4>
                <p>{p.spec}</p>
              </button>
            ))}
          </div>

          <div className={styles.showcaseContainer}>
            <div className={styles.detailsPanel}>
               <span className={styles.productBadge}>Active Model</span>
               <h2>{products[activeProduct].name}</h2>
               <p className={styles.productSpec}>{products[activeProduct].spec}</p>
               <button 
                 className={styles.specsBtn}
                 onClick={() => navigate(`/products/${products[activeProduct].id}`)}
               >
                 View Specifications &rarr;
               </button>
            </div>
            
            <div className={styles.imagePanel}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={products[activeProduct].id}
                  src={products[activeProduct].image}
                  alt={products[activeProduct].name}
                  className={styles.productImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
