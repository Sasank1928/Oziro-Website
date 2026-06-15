import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

const TiltCard = ({ children, p, idx, navigate }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Rotate based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className={styles.tiltWrapper}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
    >
      <motion.div
        className={`${styles.productCard} glass-panel`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div className={styles.cardImageWrapper} style={{ transform: "translateZ(70px)" }}>
          <img src={p.image} alt={p.name} className={`${styles.cardImage} ${styles[p.id]}`} />
        </div>
        <div className={styles.cardContent} style={{ transform: "translateZ(40px)" }}>
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
    </motion.div>
  );
};

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
            <TiltCard key={p.id} p={p} idx={idx} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
