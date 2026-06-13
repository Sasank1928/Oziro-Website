import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const navLinks = [
  { name: 'Home', href: '#home', isSection: true },
  { name: 'About', href: '#about', isSection: true },
  { name: 'Services', href: '/services', isSection: false },
  { name: 'Products', href: '/products', isSection: false },
  { name: 'Contact', href: '#contact', isSection: true },
];


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for navbar background
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Scroll Spy for active section link (only runs when on Home page)
      if (location.pathname === '/') {
        const scrollPosition = window.scrollY + 180; // offset buffer
        let current = '';

        for (const link of navLinks) {
          if (link.isSection) {
            const el = document.querySelector(link.href);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                current = link.href;
              }
            }
          }
        }

        if (window.scrollY < 100) {
          current = '';
        }

        setActiveSection(current);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    setMenuOpen(false);

    if (link.isSection) {
      e.preventDefault();
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: link.href } });
      } else {
        const target = document.querySelector(link.href);
        if (target) {
          if (window.lenis) {
            window.lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    } else {
      e.preventDefault();
      navigate(link.href);
    }
  };

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <a 
          href="/" 
          className={styles.logo} 
          onClick={(e) => { 
            e.preventDefault(); 
            if (location.pathname === '/') {
              if (window.lenis) {
                window.lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              navigate('/');
            }
          }}
        >
          Oziro<span>Tech</span>
        </a>

        <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link, index) => {
            const isLinkActive = link.isSection 
              ? activeSection === link.href 
              : location.pathname === link.href;

            return (
              <a 
                key={index} 
                href={link.href} 
                className={`${styles.link} ${isLinkActive ? styles.active : ''}`} 
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className={styles.mobileToggle}>
          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
            <div className={`${styles.bar} ${menuOpen ? styles.open : ''}`} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
