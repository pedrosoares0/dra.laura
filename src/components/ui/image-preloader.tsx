import { useEffect, useState } from 'react';

const CRITICAL_IMAGES = [
  'bgherolight.png',
  'favicon.png',
  'logoToinho.png',
  'sem-titulo-1.png',
  'foto (1).jpeg',
  'foto (5).png',
  'foto (8).png',
  '3faixas3.png',
  '4faixas.png',
  '4faixas2.png'
];

export default function ImagePreloader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;

    if (total === 0) {
      setLoaded(true);
      return;
    }

    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Continue even if one fails
      });
    };

    Promise.all(CRITICAL_IMAGES.map(src => 
      loadImage(src).then(() => {
        loadedCount++;
        setProgress(Math.round((loadedCount / total) * 100));
      })
    )).then(() => {
      // Small delay for smooth transition
      setTimeout(() => setLoaded(true), 800);
    });
  }, []);

  if (!loaded) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-8">
          <img src="favicon.png" alt="Loading..." className="w-full h-full object-contain animate-pulse" />
          <div className="absolute inset-0 border-4 border-brand-blue/10 border-t-brand-blue rounded-full animate-spin" />
        </div>
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand-blue transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="mt-4 text-[10px] font-sans font-black text-brand-blue uppercase tracking-[0.3em]">
          Carregando Experiência {progress}%
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
