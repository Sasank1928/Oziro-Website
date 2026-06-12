import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import styles from './Testimonials.module.css';

const testimonialsData = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Head of Robotics, FutureCorp",
    content: "Oziro Tech's humanoid solutions have entirely reshaped our automated customer assistance lines. Their AI integration is unmatched.",
    rating: 5
  },
  {
    name: "Michael Chang",
    role: "Operations Director, Global Logistics",
    content: "Deploying Oziro's autonomous drones in our warehouses increased scanning efficiency by 300%. True pioneers in the space.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Chief Surgeon, MedTech Solutions",
    content: "The precision of their robotic arms for surgical assistance is revolutionary. Reliable, intelligent, and incredibly accurate.",
    rating: 5
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(current === testimonialsData.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? testimonialsData.length - 1 : current - 1);
  };

  return (
    <section className={styles.testimonials} id="testimonials" ref={ref}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Client <span className="text-gradient">Testimonials</span>
          </motion.h2>
        </div>

        <motion.div 
          className={styles.carouselContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div key={index} className={styles.slide}>
                  <div className={`${styles.card} glass-panel`}>
                    <div className={styles.stars}>
                      {[...Array(testimonial.rating)].map((_, i) => <FiStar key={i} />)}
                    </div>
                    <p className={styles.content}>"{testimonial.content}"</p>
                    <div className={styles.authorInfo}>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>
            <FiChevronRight />
          </button>

          <div className={styles.indicators}>
            {testimonialsData.map((_, index) => (
              <button 
                key={index} 
                className={`${styles.dot} ${current === index ? styles.activeDot : ''}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
