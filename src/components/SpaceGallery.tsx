import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  {
    src: './assets/images/atendimento1.webp',
    alt: 'Consultório Clínico Estético - Equipamentos',
    description: 'Equipamentos modernos e tecnologia a favor do seu sorriso.',
  },
  {
    src: './assets/images/ambiente.JPG',
    alt: 'Sala de Atendimento Confortável',
    description: 'Ambiente planejado para proporcionar máximo bem-estar e tranquilidade.',
  },
  {
    src: './assets/images/resultado1.webp',
    alt: 'Detalhes de Cuidado no Atendimento',
    description: 'Biossegurança e ergonomia em cada detalhe.',
  },
  {
    src: './assets/images/atendimento4.webp',
    alt: 'Consultório da Dra. Laura Laytynher',
    description: 'Espaço acolhedor projetado para receber você com cuidado integral.',
  },
];

export default function SpaceGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger entry animation for gallery items
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.gallery-header-anim',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-header-anim',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Photos animation
      const items = gridRef.current?.querySelectorAll('.gallery-item');
      if (items && items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95, y: 30, filter: 'blur(12px)' },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === null ? null : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === null ? null : (prev + 1) % GALLERY_IMAGES.length));
  };

  return (
    <section
      ref={sectionRef}
      id="ambiente"
      className="py-20 md:py-28 bg-dental-bg transition-colors duration-500 relative overflow-hidden"
      aria-label="Espaço de Atendimento"
    >
      {/* Editorial aesthetic background image (lightly blurred & translucent to breathe life into the dark-blue theme) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="https://i.pinimg.com/1200x/79/4d/69/794d693f13923fdc0a86ea7c802cb149.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.14] dark:opacity-[0.08] filter blur-[2px] transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dental-bg via-transparent to-dental-bg" />
      </div>

      <div className="w-[92%] max-w-[1080px] mx-auto relative z-10">

        {/* Section Header */}
        <header className="max-w-[560px] mb-12 sm:mb-16">
          <span className="gallery-header-anim text-[11px] font-bold text-dental-gold uppercase tracking-[0.24em] block mb-3">
            Atendimento
          </span>
          <h2 className="gallery-header-anim text-3xl sm:text-4xl font-display font-medium leading-tight mb-4 text-dental-ink">
            Ambiente{' '}
            <span className="font-display italic text-dental-gold tracking-normal">
              acolhedor.
            </span>
          </h2>
          <p className="gallery-header-anim text-[14px] sm:text-[15px] text-dental-muted font-light leading-relaxed">
            Consulte no melhor conforto físico e em salas projetadas para cuidado estético de alto padrão.
          </p>
        </header>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={img.src}
              onClick={() => setActiveIdx(idx)}
              className="gallery-item group relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-md transition-all duration-500 hover:shadow-2xl hover:scale-102 cursor-pointer"
            >
              {/* Image element */}
              <img
                src={encodeURI(img.src)}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Elegant Gold hover overlay with search button */}
              <div className="absolute inset-0 z-10 bg-dental-ink/40 backdrop-blur-[2px] transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 transform scale-75 group-hover:scale-100 hover:bg-white hover:text-dental-ink shadow-lg">
                  <FiMaximize2 className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal Overlay */}
      {activeIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 transition-all duration-500 animate-fade-in">

          {/* Top Bar inside modal */}
          <div className="flex items-center justify-between w-full text-white/70 max-w-[1200px] mx-auto z-10">
            <span className="text-sm tracking-widest font-sans uppercase">
              Galeria ({activeIdx + 1} / {GALLERY_IMAGES.length})
            </span>
            <button
              onClick={() => setActiveIdx(null)}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300"
              aria-label="Fechar Galeria"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Core Image Display Area */}
          <div className="flex-1 flex items-center justify-center relative w-full max-w-[1200px] mx-auto my-4 select-none">
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:left-4 p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 active:scale-90 transition-all z-10"
              aria-label="Foto Anterior"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Active Photo */}
            <div className="relative max-h-[72vh] max-w-[85vw] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 animate-fade-in flex items-center justify-center">
              <img
                src={encodeURI(GALLERY_IMAGES[activeIdx].src)}
                alt={GALLERY_IMAGES[activeIdx].alt}
                className="max-h-[72vh] max-w-[85vw] object-contain rounded-xl"
              />
            </div>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-0 sm:right-4 p-3.5 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/10 active:scale-90 transition-all z-10"
              aria-label="Próxima Foto"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Title & Description inside modal */}
          <div className="w-full text-center text-white/90 max-w-[800px] mx-auto z-10">
            <h4 className="font-display italic text-2xl text-dental-gold mb-1">
              {GALLERY_IMAGES[activeIdx].alt}
            </h4>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-[520px] mx-auto">
              {GALLERY_IMAGES[activeIdx].description}
            </p>
          </div>

        </div>
      )}
    </section>
  );
}
