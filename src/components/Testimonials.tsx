import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROW1_IMAGES = [
  { src: './assets/images/laura (35).webp', alt: 'Procedimento clínico estético' },
  { src: './assets/images/bento (1).jpeg', alt: 'Espaço Dra. Laura' },
  { src: './assets/images/IMG_1527.webp', alt: 'Caso Clínico Resina Composta' },
  { src: './assets/images/protese.jpg', alt: 'Cuidado e biossegurança de ponta' },
  { src: './assets/images/sentada.jpg', alt: 'Dra. Laura Laytynher' },
  { src: './assets/images/resultado2.webp', alt: 'Sorriso finalizado com naturalidade' },
  { src: './assets/images/atendimento1.webp', alt: 'Atendimento individualizado' },
  { src: './assets/images/bento (1).jpeg', alt: 'Reabilitação Oral de alta performance' },
];

const ROW2_IMAGES = [
  { src: './assets/images/amor.JPG', alt: 'Caso clínico Inicial' },
  { src: './assets/images/amor.JPG', alt: 'Caso clínico Finalizado' },
  { src: './assets/images/café.JPG', alt: 'Dra. Laura Laytynher' },
  { src: './assets/images/dps.jpeg', alt: 'Consultório Moderno e Acolhedor' },
  { src: './assets/images/qw.jpg', alt: 'Sorriso Inicial' },
  { src: './assets/images/resultado1.webp', alt: 'Sorriso Finalizado' },
  { src: './assets/images/laura (35).webp', alt: 'Dra. Laura Laytynher' },
  { src: './assets/images/atendimento3.webp', alt: 'Precisão e técnica odontológica' },
];

const ROW3_IMAGES = [
  { src: './assets/images/bento (2).jpeg', alt: 'Resultado estético natural' },
  { src: './assets/images/resultado1.webp', alt: 'Caso clínico reabilitado' },
  { src: './assets/images/atendimento4.webp', alt: 'Atendimento de alto padrão' },
  { src: './assets/images/protese.jpg', alt: 'Prótese com alta tecnologia' },
  { src: './assets/images/café.JPG', alt: 'Dra. Laura Laytynher' },
  { src: './assets/images/sentada.jpg', alt: 'Dra. Laura no consultório' },
  { src: './assets/images/dps.jpeg', alt: 'Transformação completa' },
  { src: './assets/images/atendimento1.webp', alt: 'Precisão clínica' },
];

// Duplicate arrays to ensure seamless looping without empty space on wide screens
const ROW1_ENDLESS = [...ROW1_IMAGES, ...ROW1_IMAGES];
const ROW2_ENDLESS = [...ROW2_IMAGES, ...ROW2_IMAGES];
const ROW3_ENDLESS = [...ROW3_IMAGES, ...ROW3_IMAGES];

interface MarqueeRowProps {
  className: string;
  images: Array<{ src: string; alt: string }>;
  rowKey: string;
  imageClass?: string;
}

function MarqueeRow({ className, images, rowKey, imageClass = "w-[160px] md:w-[340px] md:rounded-[24px]" }: MarqueeRowProps) {
  return (
    <div className={`${className} flex gap-3 sm:gap-5 whitespace-nowrap will-change-transform overflow-visible`}>
      {images.map((img, idx) => (
        <div
          key={`${rowKey}-${idx}`}
          className={`relative aspect-[4/3] rounded-[16px] overflow-hidden border border-white/5 shadow-2xl shrink-0 group bg-slate-900 ${imageClass}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 pointer-events-none select-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation with blur reveal
      gsap.fromTo(
        '.testimonials-header-anim',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-header-anim',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Row 1 goes left to right
      gsap.fromTo(
        '.marquee-row-1',
        { xPercent: -35 },
        {
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      // Row 2 goes right to left
      gsap.fromTo(
        '.marquee-row-2',
        { xPercent: 10 },
        {
          xPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );

      // Row 3 goes left to right (slightly different speed for organic feel)
      gsap.fromTo(
        '.marquee-row-3',
        { xPercent: -30 },
        {
          xPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.0,
          },
        }
      );
    }, sectionRef);

    // Refresh ScrollTrigger after a brief delay
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-clinico"
      className="py-24 sm:py-32 bg-[#0B182D] relative overflow-hidden select-none"
      aria-label="Portfólio de Transformações Clínicas"
    >
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-dental-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-dental-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full">

        {/* Luxury Header */}
        <div className="max-w-[1240px] mx-auto px-6 mb-16 sm:mb-20 text-center">
          <span className="testimonials-header-anim text-[10px] font-bold text-dental-gold uppercase tracking-[0.24em] block mb-3">
            Portfólio Clínico
          </span>
          <h2 className="testimonials-header-anim text-3xl sm:text-4xl lg:text-5xl font-display font-medium leading-tight text-white max-w-2xl mx-auto">
            Transformações reais e{' '}
            <span className="font-display italic text-dental-gold tracking-normal">
              sorrisos reabilitados.
            </span>
          </h2>
        </div>

        {/* Tilted Marquee Rows — 3 rows for full coverage */}
        <div className="flex flex-col gap-3 sm:gap-5 -rotate-[3deg] sm:-rotate-[4deg] scale-105 overflow-visible py-4">

          {/* Row 1: Left to Right */}
          <MarqueeRow
            className="marquee-row-1"
            images={ROW1_ENDLESS}
            rowKey="r1"
          />

          {/* Row 3 (middle): Left to Right, staggered offset - MOBILE ONLY */}
          <MarqueeRow
            className="marquee-row-3 flex md:hidden ml-[-80px] sm:ml-[-120px]"
            images={ROW3_ENDLESS}
            rowKey="r3"
            imageClass="w-[160px]"
          />

          {/* Row 2: Right to Left */}
          <MarqueeRow
            className="marquee-row-2 ml-[-120px] md:ml-[-250px]"
            images={ROW2_ENDLESS}
            rowKey="r2"
          />

        </div>

      </div>
    </section>
  );
}
