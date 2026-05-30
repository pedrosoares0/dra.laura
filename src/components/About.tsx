import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  theme: string;
}

export default function About({ theme }: AboutProps) {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blur reveal for portrait
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, y: 40, scale: 0.98, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Blur reveal for content card
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getLogoSrc = () => {
    switch (theme) {
      case 'light':
        return './assets/images/logo-simbolo.webp';
      case 'dark-blue':
        return './assets/images/logo-simbolo-azul.webp';
      default:
        return './assets/images/logo-simbolo.webp';
    }
  };

  const skills = [
    'Cirurgiã-dentista',
    'Foco em odontologia restauradora',
    'Prótese removível',
    'Prótese fixa',
    'Lentes em resina composta',
  ];

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-20 md:py-28 relative overflow-hidden bg-dental-bg transition-colors duration-500"
      aria-label="Sobre a Doutora"
    >
      {/* Decorative background radial glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-dental-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-dental-ink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[92%] max-w-[1080px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative max-w-[340px] md:max-w-[380px] w-full aspect-[3/4] group"
              onMouseEnter={() => setIsPhotoHovered(true)}
              onMouseLeave={() => setIsPhotoHovered(false)}
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-3 border border-dental-gold/30 rounded-[32px] pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]" />

              {/* Polaroid Photo Behind Left */}
              <div
                className="absolute inset-0 bg-white p-1.5 pb-4 rounded-xl shadow-lg border border-slate-100/50 z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-left opacity-0 scale-75 translate-x-0 rotate-0 group-hover:opacity-100 group-hover:scale-[0.82] group-hover:-translate-x-24 group-hover:-translate-y-6 group-hover:-rotate-[15deg] pointer-events-none"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src="./assets/images/laura (34).webp"
                  alt=""
                  className="w-full h-[86%] object-cover rounded-md grayscale-[15%]"
                />
                <div className="h-[14%] flex items-center justify-center">
                  <span className="font-display italic text-[9.5px] text-dental-gold/75 tracking-wider">Laura</span>
                </div>
              </div>

              {/* Polaroid Photo Behind Right */}
              <div
                className="absolute inset-0 bg-white p-1.5 pb-4 rounded-xl shadow-lg border border-slate-100/50 z-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right opacity-0 scale-75 translate-x-0 rotate-0 group-hover:opacity-100 group-hover:scale-[0.82] group-hover:translate-x-24 group-hover:-translate-y-4 group-hover:rotate-[15deg] pointer-events-none"
                style={{
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src="./assets/images/laura (35).webp"
                  alt=""
                  className="w-full h-[86%] object-cover rounded-md grayscale-[15%]"
                />
                <div className="h-[14%] flex items-center justify-center">
                  <span className="font-display italic text-[9.5px] text-dental-gold/75 tracking-wider">Laura</span>
                </div>
              </div>

              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img
                  ref={imgRef}
                  src="./assets/images/laura2.webp"
                  alt="Dra. Laura Laytynher"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Soft glow mix-blend mode cover */}
                <div className="absolute inset-0 bg-dental-gold/5 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Floating aesthetic stats/credentials tag */}
              <div className="absolute -bottom-5 -right-3 sm:-right-4 bg-white text-slate-800 py-2.5 px-5 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-100 transition-transform duration-300 hover:scale-105 z-20 w-max">
                <span className="font-display italic text-[38px] text-dental-gold leading-none">Dra.</span>
                <div className="flex flex-col text-left leading-none">
                  <span className="font-display text-[20px] font-normal text-slate-900 leading-none">Laura Laytynher</span>
                  <span className="text-[9px] text-slate-400 mt-1.5 tracking-widest uppercase font-semibold leading-none font-sans">CRO-BA 28.230</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center">
            <div
              className={`relative p-6 sm:p-10 rounded-[32px] bg-dental-cardBg border border-dental-lineSoft shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isPhotoHovered ? 'lg:translate-x-20' : 'translate-x-0'
                }`}
            >
              {/* Circular Rotating Credentials Badge */}
              <div className="relative mx-auto mb-6 md:mb-0 md:absolute md:-top-14 md:right-6 w-28 h-28 flex items-center justify-center select-none z-20">
                {/* Central logo symbol rendered directly without background wrapper */}
                <img
                  src={getLogoSrc()}
                  alt=""
                  className="absolute w-14 h-14 object-contain transition-transform hover:scale-115 z-10 pointer-events-none select-none"
                />
                {/* Rotating SVG circular text */}
                <svg
                  className="w-full h-full animate-[spin_25s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[7.2px] font-sans font-light uppercase tracking-[0.15em] fill-dental-muted">
                    <textPath href="#circlePath" startOffset="0%">
                      Laura Laytynher • Cirurgiã Dentista • CRO •
                    </textPath>
                  </text>
                </svg>
              </div>

              <span className="text-[11px] font-bold text-dental-gold uppercase tracking-[0.24em] block mb-3">
                Sobre a doutora
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-medium leading-tight mb-6 text-dental-ink">
                <span className="font-display italic text-dental-gold tracking-normal">Cuidado</span> em cada atendimento.
              </h2>

              <p className="text-[15px] sm:text-base text-dental-muted leading-relaxed font-light mb-8 max-w-[92%]">
                Minha trajetória é marcada pela combinação entre conhecimento técnico, atualização constante
                e um olhar atento à história de cada paciente. Meu propósito é entregar tratamentos previsíveis,
                confortáveis e com resultados que valorizem a naturalidade do seu sorriso.
              </p>

              {/* Skill Pill List */}
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F1ED] hover:bg-white text-[#193C70] text-[13px] font-medium rounded-full border border-[#193C70]/10 hover:border-dental-gold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dental-gold" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
