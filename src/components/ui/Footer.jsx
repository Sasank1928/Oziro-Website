import React from 'react';
import { FiTwitter, FiLinkedin, FiGithub, FiYoutube } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
    } else {
      const target = document.querySelector(href);
      if (target) {
        if (window.lenis) {
          window.lenis.scrollTo(target);
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>Oziro<span>Tech</span></h3>
            <p className={styles.description}>
              Engineering the Future of Robotics & Artificial Intelligence.
              Developing intelligent systems and next-generation technologies.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><FiTwitter /></a>
              <a href="#" className={styles.socialIcon}><FiLinkedin /></a>
              <a href="#" className={styles.socialIcon}><FiGithub /></a>
              <a href="#" className={styles.socialIcon}><FiYoutube /></a>
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4>Solutions</h4>
            <a href="#">Autonomous Drones</a>
            <a href="#">Robotic Arms</a>
            <a href="#">AI Automation</a>
            <a href="#">Computer Vision</a>
          </div>
          
          <div className={styles.linksColumn}>
            <h4>Company</h4>
            <a href="#about" onClick={(e) => handleScrollTo(e, '#about')}>About Us</a>
            <a href="#">Careers</a>
            <a href="#">News & Press</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>Contact</a>
          </div>
          
          <div className={styles.linksColumn}>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Oziro Tech AI World Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
