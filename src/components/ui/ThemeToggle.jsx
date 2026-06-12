import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleBtn} onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === 'dark' ? <FiSun className={styles.icon} /> : <FiMoon className={styles.icon} />}
    </button>
  );
};

export default ThemeToggle;
