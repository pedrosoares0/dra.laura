import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/ui/smooth-scroll';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import SpaceGallery from './components/SpaceGallery';
import Testimonials from './components/Testimonials';
import VideoLoop from './components/VideoLoop';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Initialize theme from localStorage (matching key theme_v2 from original main.js)
  const [theme, setTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('theme_v2');
    return savedTheme && ['light', 'dark-blue'].includes(savedTheme)
      ? savedTheme
      : 'dark-blue'; // Safira is default
  });

  // Apply theme class to body for CSS variable shifting
  useEffect(() => {
    document.body.classList.remove('dark-blue');
    
    if (theme !== 'light') {
      document.body.classList.add(theme);
    }
    
    localStorage.setItem('theme_v2', theme);
  }, [theme]);

  // Global section blur-reveal intro animation
  useEffect(() => {
    const sections = document.querySelectorAll('section[aria-label]');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 32, filter: 'blur(14px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main className="min-h-screen bg-dental-bg text-dental-ink antialiased relative transition-colors duration-500 selection:bg-dental-gold/25 selection:text-dental-ink">
      {/* Dynamic Smooth Scroll Hook */}
      <SmoothScroll />

      {/* Global Header / Navigation */}
      <Header theme={theme} setTheme={setTheme} />

      {/* Sections */}
      <Hero theme={theme} />
      <About theme={theme} />
      <Treatments />
      <SpaceGallery />
      <Testimonials />
      <VideoLoop />
      <Contact />

      {/* Footer */}
      <Footer theme={theme} />
    </main>
  );
}
