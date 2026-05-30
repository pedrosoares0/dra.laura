import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LEFT_IMAGES = [
  './assets/images/laura (1).webp',
  './assets/images/laura (34).webp',
  './assets/images/laura2.webp',
  './assets/images/laura (35).webp',
  './assets/images/laura (2,5).webp',
];

const RIGHT_IMAGES = [
  './assets/images/laura (35).webp',
  './assets/images/laura (2,5).webp',
  './assets/images/laura (1).webp',
  './assets/images/laura (34).webp',
  './assets/images/laura2.webp',
];

interface HeroProps {
  theme?: string;
}

interface CurtainPanelProps {
  panelRef: React.RefObject<HTMLDivElement>;
  images: string[];
  slideIdx: number;
  borderRight?: boolean;
}

function CurtainPanel({ panelRef, images, slideIdx, borderRight }: CurtainPanelProps) {
  return (
    <div
      ref={panelRef}
      className={`absolute top-0 w-1/2 h-full z-20 overflow-hidden ${
        borderRight ? 'left-0 border-r border-black/10' : 'right-0'
      }`}
    >
      <div className="relative w-full h-full bg-dental-bg">
        {images.map((src, idx) => {
          const isActive = idx === slideIdx;

          return (
            <div
              key={src + idx}
              style={{
                backgroundImage: `url('${src}')`,
                backgroundPosition: '50% 20%',
              }}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[400ms] ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          );
        })}
        {/* Subtle shade overlay */}
        <div className="absolute inset-0 z-20 bg-black/10 pointer-events-none" />
      </div>
    </div>
  );
}

export default function Hero({ theme }: HeroProps) {
  const [slideIdx, setSlideIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // 1. Slideshow cycle logic (1.4 seconds interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % LEFT_IMAGES.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  // 2. GSAP Pinning, Curtain Reveal & Scrub Text Blur Reveal scroll animation
  useEffect(() => {
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=240%', // 240% viewport height for a much longer, subtle scroll experience
          scrub: 1.8, // Smooth physical weight/damping
          pin: true,
          anticipatePin: 1,
        },
      });

      // Part the split curtains left and right
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -100,
          ease: 'power2.inOut',
        },
        0
      )
        .to(
          rightPanelRef.current,
          {
            xPercent: 100,
            ease: 'power2.inOut',
          },
          0
        )
        // Scrub-linked animated reveal with dynamic blur filter
        // Emerges from a soft blur to perfect focus as the curtains part
        .fromTo(
          '.hero-logo-reveal',
          {
            opacity: 0,
            y: 35,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
          },
          0.1
        )
        .fromTo(
          '.hero-title-reveal',
          {
            opacity: 0,
            y: 40,
            filter: 'blur(16px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power3.out',
          },
          0.2
        )
        .fromTo(
          '.hero-sub-reveal',
          {
            opacity: 0,
            y: 25,
            filter: 'blur(10px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
          },
          0.4
        )
        .fromTo(
          '.hero-cta-reveal',
          {
            opacity: 0,
            y: 20,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'power2.out',
          },
          0.6
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#sobre');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative h-screen w-full overflow-hidden bg-dental-bg transition-colors duration-500"
      aria-label="Apresentação da Dra. Laura Laytynher"
    >
      {/* 
        A. CENTER COPY & CONTENT
        This sits behind the curtains (z-10) and is slowly revealed during scroll
      */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Custom blurred, translucent background image */}
        <div
          className={`absolute inset-0 pointer-events-none select-none z-0 bg-cover bg-center blur-[2px] transition-all duration-700 ${
            theme === 'dark-blue' ? 'opacity-[0.22]' : 'opacity-[0.16]'
          }`}
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/be/50/1b/be501bb79c607ddf4834163e73eafd9a.jpg')",
          }}
        />

        {/* Large Brand Symbol Watermark Background */}
        <div
          className="absolute -left-[22%] md:-left-[15%] top-1/2 -translate-y-1/2 w-[85vw] md:w-[50vw] max-w-[700px] aspect-square pointer-events-none select-none z-0 hero-watermark transition-all duration-700 ease-in-out"
          style={{
            backgroundSize: 'contain',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        <div className="max-w-[720px] mx-auto flex flex-col items-center relative z-10">
          {/* Brand Symbol Icon */}
          <div className="hero-logo-reveal w-48 h-auto max-h-12 mb-6 opacity-90 select-none will-change-transform flex items-center justify-center">
            <img
              src="./assets/images/logohorizontal.webp"
              alt="Dra. Laura Laytynher"
              className="w-full h-auto object-contain filter dark:brightness-0 dark:invert"
            />
          </div>

          {/* Premium Editorial Headline */}
          <h1 className="hero-title-reveal text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-[1.08] mb-6 text-dental-ink text-balance will-change-transform">
            Apaixonada em transformar{' '}
            <span className="font-display italic text-dental-gold tracking-normal">
              sorrisos!
            </span>
          </h1>

          {/* Persuasive Description */}
          <p className="hero-sub-reveal text-[14px] sm:text-base md:text-lg text-dental-muted font-light leading-relaxed max-w-[500px] mb-8 text-pretty will-change-transform">
            Odontologia estética e restauradora com técnica, sensibilidade e tecnologia para cuidar da naturalidade do seu sorriso.
          </p>

          {/* Actions */}
          <div className="hero-cta-reveal flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto will-change-transform">
            <a
              href="https://wa.me/5571991163943?text=Ol%C3%A1!%20Tenho%20interesse%20de%20realizar%20uma%20avalia%C3%A7%C3%A3o"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden px-8 py-4 bg-dental-ink rounded-lg transition-all duration-500 hover:-translate-y-[2px] active:translate-y-0 shadow-md shadow-dental-ink/15 hover:shadow-lg hover:shadow-dental-gold/15 w-full sm:w-auto text-center flex items-center justify-center"
            >
              {/* Golden champagne slide-in background fill */}
              <span className="absolute inset-0 bg-dental-gold transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rounded-lg pointer-events-none z-0" />

              {/* Outer luxury ring that expands outwards on hover */}
              <span className="absolute inset-0 rounded-lg border border-dental-gold/0 scale-100 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-dental-gold/65 group-hover:scale-[1.05] pointer-events-none z-10" />

              {/* Shimmer overlay */}
              <span className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full transition-transform duration-[1000ms] ease-out group-hover:translate-x-full" />
              </span>

              <span className={`relative z-20 transition-colors duration-500 font-sans text-[11px] font-bold uppercase tracking-[0.24em] ${
                theme === 'dark-blue' ? 'text-[#142A4F]' : 'text-white group-hover:text-[#142A4F]'
              }`}>
                Agendar avaliação
              </span>
            </a>
            <a
              href="#sobre"
              onClick={handleCtaClick}
              className="relative group overflow-hidden px-8 py-4 bg-transparent text-dental-ink font-sans text-[11px] font-bold uppercase tracking-[0.24em] rounded-lg border border-dental-ink/25 transition-all duration-500 hover:-translate-y-[2px] active:translate-y-0 w-full sm:w-auto text-center flex items-center justify-center"
            >
              {/* Outer expanding ring */}
              <span className="absolute inset-0 rounded-lg border border-dental-ink/0 scale-100 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-dental-ink/35 group-hover:scale-[1.05] pointer-events-none" />

              {/* Hidden slide background fill */}
              <span className="absolute inset-0 bg-dental-ink/5 transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rounded-lg pointer-events-none" />

              <span className="relative z-10">Conhecer doutora</span>
            </a>
          </div>
        </div>
      </div>

      {/* 
        B. CURTAIN PANELS (z-20)
        Split layout sitting on top of the text, sliding apart on scroll
      */}

      {/* 1. LEFT PANEL: CURTAIN PART 1 */}
      <CurtainPanel
        panelRef={leftPanelRef}
        images={LEFT_IMAGES}
        slideIdx={slideIdx}
        borderRight
      />

      {/* 2. RIGHT PANEL: CURTAIN PART 2 */}
      <CurtainPanel
        panelRef={rightPanelRef}
        images={RIGHT_IMAGES}
        slideIdx={slideIdx}
      />
    </section>
  );
}
