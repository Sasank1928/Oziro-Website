import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Solutions from '../components/sections/Solutions';
import Technology from '../components/sections/Technology';
import PopularProducts from '../components/sections/PopularProducts';
import ProductsTeaser from '../components/sections/ProductsTeaser';
import Innovation from '../components/sections/Innovation';
import Statistics from '../components/sections/Statistics';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Industries from '../components/sections/Industries';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/Contact';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      let scrollTarget = location.state.scrollTo;
      if (scrollTarget === '#products') {
        scrollTarget = '#popular-products';
      }
      const target = document.querySelector(scrollTarget);
      if (target) {
        // Increase timeout to 500ms to allow full page render before scrolling
        const timer = setTimeout(() => {
          if (window.lenis) {
            window.lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Solutions />
      <Technology />
      <PopularProducts />
      <ProductsTeaser />
      <Innovation />
      <Statistics />
      <WhyChooseUs />
      <Industries />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
