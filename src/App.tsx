import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Services from './components/Services';
import Internship from './components/Internship';
import Consultation from './components/Consultation';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Check if the click is on a button, link, or input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input')
      ) {
        return;
      }

      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;

      // Add to body
      document.body.appendChild(ripple);

      // Remove after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onLoadComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <Internship />
        <Consultation />
        <About />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <Contact />
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </div>
    </>
  );
}

export default App;
