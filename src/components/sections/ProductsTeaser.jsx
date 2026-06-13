import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowRight, BsGearWideConnected } from 'react-icons/bs';
import styles from './ProductsTeaser.module.css';
import carImage from '../../assets/car_avatar.png';

const ProductsTeaser = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.teaserSection} id="productsTeaser">
      <div className={styles.container}>
        <div className={`${styles.card} glass-panel`}>
          <div className={styles.content}>
            <div className={styles.iconWrapper}>
              <BsGearWideConnected className={styles.icon} />
            </div>
            
            <h2 className={styles.title}>
              Explore Our <span className="text-gradient">Robotic Catalog</span>
            </h2>
            
            <p className={styles.subtitle}>
              Inspect Oziro's complete portfolio of autonomous systems.
            </p>
            
            <p className={styles.description}>
              We engineer fully integrated hardware systems designed to automate manufacturing floors, hospital corridors, and dangerous tactical borders. Click below to access our interactive 3D product catalog containing humanoids, heavy AMRs, tactical rovers, all-terrain quadrupeds, aerial drones, collaborative manipulators, and holographic projections.
            </p>
            
            <button 
              className={styles.exploreBtn} 
              onClick={() => navigate('/products')}
            >
              Explore 3D Products Gallery <BsArrowRight className={styles.arrowIcon} />
            </button>
          </div>
          
          <div className={styles.visualColumn}>
            {/* Visual element representing high-tech catalog */}
            <div className={styles.meshGlow}></div>
            <div className={styles.hologramRing}></div>
            <div className={styles.hologramRingOuter}></div>
            <img src={carImage} alt="Oziro CyberRover Preview" className={styles.visualImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsTeaser;
