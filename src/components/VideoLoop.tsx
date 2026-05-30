import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiHeart, FiSend } from 'react-icons/fi';
import { ImageComparisonSlider } from './ui/image-comparison-slider-horizontal';

gsap.registerPlugin(ScrollTrigger);

export default function VideoLoop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale-in reveal for the smartphone mockup
      gsap.fromTo(
        '.smartphone-mockup-reveal',
        { scale: 0.95, opacity: 0, y: 40, filter: 'blur(14px)' },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.smartphone-mockup-reveal',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stagger reveal for bento grid tiles
      const tiles = bentoRef.current?.querySelectorAll('.bento-tile-anim');
      if (tiles && tiles.length) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 35, filter: 'blur(12px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-28 bg-dental-bg transition-colors duration-500 overflow-visible"
      aria-label="Bastidores Clínicos e Redes Sociais"
    >
      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT COLUMN: Bento Grid (8 Cols) */}
          <div ref={bentoRef} className="lg:col-span-8 flex flex-col gap-4">

            {/* Bento Subgrid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Tile 1: Before & After Image Comparison Slider (col-span-2) */}
              <div className="sm:col-span-2 bento-tile-anim relative w-full h-[240px] sm:h-[320px] lg:h-[320px] rounded-[28px] overflow-hidden border border-slate-100/60 dark:border-slate-800/40 shadow-[0_12px_30px_rgba(0,0,0,0.03)] bg-black/5">
                <ImageComparisonSlider
                  leftImage="./assets/images/antes.png"
                  rightImage="./assets/images/depois.png"
                  altLeft="Antes do tratamento"
                  altRight="Depois do tratamento"
                  className="w-full h-full object-cover"
                />
                {/* Floating high-end indicator badge */}
                <div className="absolute bottom-4 left-4 bg-black/55 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[9px] font-sans font-medium uppercase tracking-wider z-20 pointer-events-none select-none">
                  Antes / Depois
                </div>
              </div>

              {/* Tile 2: Clinical photo 1 (col-span-1) - Bento (2) */}
              <div className="bento-tile-anim relative w-full h-[180px] sm:h-[240px] lg:h-[197px] rounded-[24px] overflow-hidden border border-slate-100/60 dark:border-slate-800/40 shadow-[0_12px_30px_rgba(0,0,0,0.03)] group bg-black/5">
                <img
                  src="./assets/images/bento (2).jpeg"
                  alt="Procedimento clínico da Dra. Laura"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Tile 3: Clinical photo 2 (col-span-1) - Bento (1) */}
              <div className="bento-tile-anim relative w-full h-[180px] sm:h-[240px] lg:h-[197px] rounded-[24px] overflow-hidden border border-slate-100/60 dark:border-slate-800/40 shadow-[0_12px_30px_rgba(0,0,0,0.03)] group bg-black/5">
                <img
                  src="./assets/images/bento (1).jpeg"
                  alt="Sorriso reabilitado pela Dra. Laura"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Realistic Instagram Story Mockup (4 Cols) */}
          <div className="lg:col-span-4 flex justify-center smartphone-mockup-reveal">

            {/* Outer iPhone Mockup shape — border only on desktop */}
            <div
              className="relative w-full lg:w-[300px] aspect-[9/16] rounded-[28px] lg:rounded-[38px] border-0 lg:border-[5px] border-slate-900/90 dark:border-slate-800/95 bg-black overflow-hidden lg:shadow-[0_30px_70px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.01]"
              style={{
                boxShadow: '0 30px 70px -15px rgba(0,0,0,0.25)',
              }}
            >
              {/* Autoplaying Loop Video */}
              <video
                ref={videoRef}
                src="./assets/images/videoteste.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover rounded-[32px] absolute inset-0 z-0 select-none pointer-events-none"
                aria-hidden="true"
              />

              {/* Story Overlay Layer */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/45 via-transparent to-black/45 pointer-events-none" />

              {/* A. Top Instagram Stories Progress Bars - Dynamic Anim segment */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex gap-1 z-20">
                <div className="h-[2px] bg-white/40 rounded-full flex-1 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-white rounded-full animate-story-bar-0" />
                </div>
                <div className="h-[2px] bg-white/40 rounded-full flex-1 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-white rounded-full animate-story-bar-1" />
                </div>
                <div className="h-[2px] bg-white/40 rounded-full flex-1 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-white rounded-full animate-story-bar-2" />
                </div>
              </div>

              {/* B. Profile header row */}
              <div className="absolute top-7 left-3.5 right-3.5 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-white/50 bg-white">
                    <img
                      src="./assets/images/icon.webp"
                      alt="Dra. Laura Laytynher"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-white shadow-sm tracking-wide">lauralaytynher</span>
                    <span className="w-1 h-1 rounded-full bg-white/60" />
                    <span className="text-[9.5px] font-light text-white/70 shadow-sm">3h</span>
                  </div>
                </div>

                {/* Right controls placeholder (three dots icon) */}
                <div className="flex gap-0.5 pointer-events-none">
                  <div className="w-0.5 h-0.5 rounded-full bg-white" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white" />
                  <div className="w-0.5 h-0.5 rounded-full bg-white" />
                </div>
              </div>

              {/* C. Bottom Stories Interaction Row (Input & Buttons) */}
              <div className="absolute bottom-4 left-3.5 right-3.5 flex items-center justify-between gap-3 z-20">
                <div className="flex-1 py-2 px-4 rounded-full border border-white/25 bg-black/25 backdrop-blur-md text-[11px] font-sans font-light text-white/95 text-left select-none pointer-events-none">
                  Enviar mensagem...
                </div>

                {/* Heart React Button */}
                <button className="text-white hover:text-red-500 hover:scale-110 active:scale-95 transition-all duration-300">
                  <FiHeart className="w-4 h-4 fill-current" />
                </button>

                {/* Send Button */}
                <button className="text-white hover:text-dental-gold hover:scale-110 active:scale-95 transition-all duration-300">
                  <FiSend className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
