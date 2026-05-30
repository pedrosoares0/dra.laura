import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TreatmentItem {
  num: string;
  title: string;
  headline: string;
  description: string;
  valueProp: string;
  watermark: string;
  image: string;
  whatsappMessage: string;
}

const TREATMENTS: TreatmentItem[] = [
  {
    num: '01',
    title: 'Odontologia estética',
    headline: 'Transformando a harmonia do seu sorriso de forma ',
    description: 'Restaurações e facetas em resina composta sob medida que preservam sua estrutura natural e devolvem a confiança.',
    valueProp: 'Restaurações invisíveis, fechamento de diastemas e facetas personalizadas que preservam ao máximo a estrutura dentária natural.',
    watermark: 'Estética',
    image: './assets/images/estética.jpeg',
    whatsappMessage: 'Olá Dra. Laura! Gostaria de agendar uma avaliação para Odontologia Estética em resina composta.'
  },
  {
    num: '02',
    title: 'Prótese Dentária',
    headline: 'Reestruturando a mastigação e a confiança com próteses estáveis de ',
    description: 'Próteses parciais, totais ou sobre implantes confeccionadas com alta tecnologia para garantir conforto anatômico absoluto.',
    valueProp: 'Próteses parciais, totais ou sobre implantes confeccionadas com alta tecnologia para garantir conforto anatômico absoluto e naturalidade visual.',
    watermark: 'Reabilitar',
    image: './assets/images/reabilitar.jpg',
    whatsappMessage: 'Olá Dra. Laura! Gostaria de agendar uma avaliação para Prótese Dentária.'
  },
  {
    num: '03',
    title: 'Clareamento',
    headline: 'Iluminando o seu sorriso com segurança e ',
    description: 'Combinação de técnicas de consultório e caseiras personalizadas para rejuvenescer a cor dos seus dentes sem sensibilidade.',
    valueProp: 'Protocolos exclusivos que minimizam a sensibilidade e entregam resultados duradouros que respeitam a integridade do seu esmalte.',
    watermark: 'Iluminar',
    image: './assets/images/caso2.webp',
    whatsappMessage: 'Olá Dra. Laura! Tenho interesse em agendar uma sessão de Clareamento Dental.'
  },
  {
    num: '04',
    title: 'Planejamento',
    headline: 'Previsibilidade cirúrgica e Mock-up digital antes do ',
    description: 'Estudo facial meticuloso, enceramento e simulação digital do sorriso para que você tome decisões seguras do início ao fim.',
    valueProp: 'Simulação digital do sorriso (Mock-up) para que você possa visualizar o resultado final em sua boca antes de iniciar qualquer procedimento.',
    watermark: 'Planejar',
    image: './assets/images/caso3.webp',
    whatsappMessage: 'Olá Dra. Laura! Gostaria de agendar uma consulta para fazer um Planejamento Digital do meu sorriso.'
  },
];

export default function Treatments() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileExpandedIdx, setMobileExpandedIdx] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade and lift with blur reveal
      gsap.fromTo(
        '.treatment-header-anim',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.treatment-header-anim',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger reveal the stacked cards with blur reveal as they enter
      const cards = containerRef.current?.querySelectorAll('.treatment-stack-card');
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, filter: 'blur(14px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Mobile accordion section blur reveal
      gsap.fromTo(
        '.treatment-mobile-showcase',
        { opacity: 0, y: 50, filter: 'blur(16px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.treatment-mobile-showcase',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMobileToggle = (idx: number) => {
    setMobileExpandedIdx(mobileExpandedIdx === idx ? null : idx);
  };

  return (
    <section
      ref={sectionRef}
      id="tratamentos"
      className="py-20 md:py-28 pb-32 md:pb-40 bg-dental-bgAlt/20 relative overflow-visible transition-colors duration-500"
      aria-label="Principais Tratamentos"
    >
      <div className="w-[92%] max-w-[960px] mx-auto relative z-10">

        {/* Section Header */}
        <header className="max-w-[560px] mb-16 sm:mb-20">
          <span className="treatment-header-anim text-[11px] font-bold text-dental-gold uppercase tracking-[0.24em] block mb-3">
            Tratamentos
          </span>
          <h2 className="treatment-header-anim text-3xl sm:text-4xl font-display font-medium leading-tight mb-4 text-dental-ink">
            O cuidado certo para cada{' '}
            <span className="font-display italic text-dental-gold tracking-normal">
              sorriso.
            </span>
          </h2>
          <p className="treatment-header-anim text-[14px] sm:text-[15px] text-dental-muted font-light leading-relaxed">
            Planejamento individualizado, alta precisão e tempo de atendimento que respeita o seu ritmo.
          </p>
        </header>

        {/* 1. DESKTOP SHOWCASE (Stacked Cards Pinning Style) */}
        <div ref={containerRef} className="hidden md:flex flex-col gap-12 md:gap-16 w-full">
          {TREATMENTS.map((item, idx) => {
            return (
              <div
                key={item.title}
                className="sticky w-full treatment-stack-card"
                style={{
                  top: '136px', // Balanced navbar clearance
                  zIndex: idx + 1,
                }}
              >
                {/* Physical card container with crisp margins and extremely soft Apple-like black shadow */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F7F1ED] rounded-[32px] p-4 md:p-6 border border-[#193C70]/12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.06)]">

                  {/* LEFT COLUMN: Editorial Text Panel */}
                  <div className="bg-white border border-slate-100 rounded-[28px] p-6 sm:p-8 md:p-10 flex flex-col justify-between h-[320px] md:h-[360px] shadow-[0_12px_30px_rgba(0,0,0,0.03)]">

                    {/* Aspas decorativas circular/rounded icon in project blue */}
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-[#193C70] text-[#F7F1ED] flex items-center justify-center mb-6 shadow-md shadow-[#193C70]/10">
                        <svg className="w-4 h-4 fill-current mt-0.5" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.988zm-12 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.987z" />
                        </svg>
                      </div>

                      {/* Headline with dynamic italic display serif plays */}
                      <h3 className="text-[18px] sm:text-[21px] md:text-[24px] font-sans font-medium text-[#193C70] leading-[1.3] text-pretty">
                        {item.headline}
                        {idx === 0 && (
                          <span className="font-display italic text-dental-gold tracking-normal">minimamente invasiva.</span>
                        )}
                        {idx === 1 && (
                          <span className="font-display italic text-dental-gold tracking-normal">alta precisão.</span>
                        )}
                        {idx === 2 && (
                          <span className="font-display italic text-dental-gold tracking-normal">protocolos exclusivos.</span>
                        )}
                        {idx === 3 && (
                          <span className="font-display italic text-dental-gold tracking-normal">primeiro toque.</span>
                        )}
                      </h3>
                    </div>

                    {/* Bottom Info and direct elegant WhatsApp link */}
                    <div className="flex flex-col gap-4">
                      <p className="text-[12px] text-slate-500 font-light leading-relaxed max-w-[95%]">
                        {item.description}
                      </p>

                      <div className="border-t border-slate-100 pt-4 flex items-center justify-center">
                        <a
                          href={`https://wa.me/5571991163943?text=${encodeURIComponent(item.whatsappMessage)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative group overflow-hidden px-6 py-3 border border-dental-gold/45 text-slate-800 font-sans text-[10.5px] font-bold uppercase tracking-[0.22em] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_-8px_rgba(198,160,114,0.3)] inline-flex items-center gap-3 shrink-0"
                        >
                          {/* Slide-in golden background fill */}
                          <span className="absolute inset-0 bg-dental-gold transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rounded-xl" />

                          {/* Shimmer reflection sweeping through the button on hover */}
                          <span className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-10">
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                          </span>

                          <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                            Solicitar Avaliação
                          </span>
                          <svg
                            className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1.5 duration-500 relative z-10 text-dental-gold group-hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN: Cinematic Image Panel */}
                  <div className="relative rounded-[28px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-slate-100/60 dark:border-slate-800/40 aspect-[1.2] h-[320px] md:h-[360px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    {/* Shadow overlay and script watermark */}
                    <div className="absolute inset-0 bg-black/15 flex items-center justify-center select-none pointer-events-none z-10 transition-colors duration-300 hover:bg-black/20">
                      <span className="font-display italic text-4xl sm:text-5xl md:text-[54px] text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] select-none leading-none tracking-wide translate-y-3 transform hover:scale-105 transition-transform duration-700">
                        {item.watermark}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 2. MOBILE SHOWCASE (Premium Accordion System) */}
        <div className="md:hidden flex flex-col gap-4 treatment-mobile-showcase">
          {TREATMENTS.map((item, idx) => {
            const isExpanded = mobileExpandedIdx === idx;
            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-white border-[#193C70]/10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleMobileToggle(idx)}
                  className="flex items-center justify-between w-full py-4 px-5 text-left border-b border-[#193C70]/10"
                >
                  <div className="flex items-center">
                    <span className="font-display text-[20px] text-dental-gold mr-4">{item.num}</span>
                    <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.14em] text-[#193C70]">
                      {item.title}
                    </span>
                  </div>

                  {/* Plus/Minus Indicator */}
                  <div className="w-6 h-6 rounded-full border border-[#193C70]/20 flex items-center justify-center text-[#193C70]">
                    <svg
                      className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {isExpanded ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className="transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxHeight: isExpanded ? '600px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="p-5 flex flex-col">
                    {/* Media Block — portrait on mobile for a more editorial feel */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-md">
                      <img
                        src={idx === 3 ? './assets/images/café.JPG' : item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Rich Details */}
                    <p className="text-[13px] text-slate-600 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="text-[11.5px] text-[#193C70]/70 italic mb-5 border-l-2 border-dental-gold/50 pl-3 leading-relaxed">
                      {item.valueProp}
                    </div>

                    {/* Mobile WhatsApp CTA Button - Custom Gold Capsule */}
                    <a
                      href={`https://wa.me/5571991163943?text=${encodeURIComponent(item.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group overflow-hidden px-6 py-3.5 border border-dental-gold/45 text-slate-800 font-sans text-[10px] font-bold uppercase tracking-[0.22em] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 shadow-sm inline-flex items-center gap-3 w-full justify-center"
                    >
                      {/* Slide-in golden background fill */}
                      <span className="absolute inset-0 bg-dental-gold transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rounded-xl" />

                      <span className="relative z-10 transition-colors duration-500 ease-in-out group-hover:text-white">
                        Solicitar Avaliação
                      </span>
                      <svg
                        className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1.5 duration-500 relative z-10 text-dental-gold group-hover:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
