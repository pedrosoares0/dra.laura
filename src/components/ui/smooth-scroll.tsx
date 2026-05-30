import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Lenis interfere com position:sticky — no mobile usamos scroll nativo
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Sincroniza Lenis com GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Adiciona o Lenis raf no ticker do GSAP para otimização máxima
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
    };
  }, []);

  return null;
}
