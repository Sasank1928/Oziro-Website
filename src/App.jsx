import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SolutionDetail from './pages/SolutionDetail';
import Labs from './pages/Labs';
import Careers from './pages/Careers';
import Newsroom from './pages/Newsroom';
import ProductsPage from './pages/ProductsPage';
import Services from './pages/Services';
import ContactPage from './pages/ContactPage';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make lenis globally accessible so we can scroll with it
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <Navbar />
        
        <main style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/solutions/:solutionId" element={<SolutionDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/news" element={<Newsroom />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
