import { useState, useEffect } from 'react';
import { FiInstagram, FiMenu, FiX, FiMessageCircle } from 'react-icons/fi';

interface HeaderProps {
  theme: string;
  setTheme: (theme: string) => void;
}

interface DesktopNavItemProps {
  item: { label: string; href: string; id: string };
  activeSection: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

function DesktopNavItem({ item, activeSection, onNavClick }: DesktopNavItemProps) {
  const isActive = activeSection === item.id;
  const letters = item.label.split("");
  return (
    <a
      href={item.href}
      onClick={(e) => onNavClick(e, item.href)}
      className={`text-[9.5px] font-inter font-extrabold uppercase tracking-[0.2em] h-3.5 relative flex items-center group transition-colors duration-500 ${
        isActive ? 'text-[#c6a072] font-semibold' : 'text-[#193C70]/85 hover:text-[#c6a072]'
      }`}
    >
      {letters.map((char, charIdx) => {
        const displayChar = char === ' ' ? '\u00A0' : char;
        return (
          <span
            key={charIdx}
            className="relative inline-flex flex-col overflow-hidden h-3.5"
          >
            {/* Primary letter */}
            <span
              className={`transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full ${
                isActive ? 'text-[#c6a072] font-semibold' : ''
              }`}
              style={{ transitionDelay: `${charIdx * 25}ms` }}
            >
              {displayChar}
            </span>
            {/* Hover letter (slid in from bottom) */}
            <span
              className="absolute top-full left-0 text-[#c6a072] font-semibold transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${charIdx * 25}ms` }}
            >
              {displayChar}
            </span>
          </span>
        );
      })}
    </a>
  );
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['inicio', 'sobre', 'tratamentos', 'ambiente', 'contato'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavItems = [
    { label: 'Início', href: '#inicio', id: 'inicio' },
    { label: 'Sobre', href: '#sobre', id: 'sobre' },
    { label: 'Tratamentos', href: '#tratamentos', id: 'tratamentos' },
  ];

  const rightNavItems = [
    { label: 'Ambiente', href: '#ambiente', id: 'ambiente' },
    { label: 'Contato', href: '#contato', id: 'contato' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] sm:w-auto ${isScrolled ? 'drop-shadow-lg' : ''
          }`}
      >
        {/* Semi-Rectangular visual container with robust Frosted Glassmorphism styling */}
        <div
          className="flex items-center justify-between md:justify-center gap-4 sm:gap-6 py-2 px-6 border transition-all duration-500 bg-[#F7F1ED]/75 dark:bg-[#0B182D]/80 border-[#193C70]/10 dark:border-white/10 shadow-[0_8px_32px_0_rgba(25,60,112,0.08)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          style={{
            borderRadius: '20px',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
          }}
        >
          {/* LEFT SIDE LINKS (Desktop) */}
          <nav className="hidden md:flex items-center gap-4">
            {leftNavItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                activeSection={activeSection}
                onNavClick={handleNavClick}
              />
            ))}
          </nav>

          {/* CENTER BRAND SYMBOL */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center justify-center cursor-pointer group mx-1"
          >
            {/* Desktop Logo: icon.webp without background */}
            <img
              src="./assets/images/icon.webp"
              alt="Laura Laytynher"
              className="hidden md:block w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            {/* Mobile Logo: logo-simbolo-azul.webp */}
            <img
              src="./assets/images/logo-simbolo-azul.webp"
              alt="Laura Laytynher"
              className="block md:hidden w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </a>

          {/* RIGHT SIDE LINKS (Desktop) */}
          <nav className="hidden md:flex items-center gap-4">
            {rightNavItems.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                activeSection={activeSection}
                onNavClick={handleNavClick}
              />
            ))}
          </nav>

          {/* CONTROLS (Theme Selector Toggle & Mobile Hamburger) */}
          <div className="flex items-center gap-3 border-l border-[#193C70]/10 pl-3">
            {/* Elegant 2-Theme Slider Toggle Capsule */}
            <div
              onClick={() => setTheme(theme === 'light' ? 'dark-blue' : 'light')}
              className="relative w-[50px] h-6 bg-[#193C70]/5 p-0.5 flex items-center justify-between rounded-full border border-[#193C70]/10 cursor-pointer select-none overflow-hidden transition-all duration-300"
              title="Alternar Tema"
            >
              {/* Sliding Highlight Pill */}
              <div
                className="absolute top-[2px] bottom-[2px] left-[2px] w-[18px] rounded-full bg-white shadow-sm border border-slate-200/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: theme === 'dark-blue' ? 'translateX(26px)' : 'none',
                }}
              />
              {/* Option 1: Pérola */}
              <div className={`w-4 h-4 rounded-full bg-[#FCF8F5] border border-slate-200/60 z-10 ml-0.5 transition-transform duration-300 ${theme === 'light' ? 'scale-110' : 'opacity-65'}`} />
              {/* Option 2: Safira */}
              <div className={`w-4 h-4 rounded-full bg-[#142a4f] border border-slate-800/10 z-10 mr-0.5 transition-transform duration-300 ${theme === 'dark-blue' ? 'scale-110' : 'opacity-65'}`} />
            </div>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-[#193C70] hover:bg-[#193C70]/5"
              aria-label="Menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Premium Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-dental-bg transition-all duration-500 flex flex-col justify-center items-center ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-8 right-8 p-3 rounded-xl border border-dental-ink/10 text-dental-ink hover:bg-dental-ink/5 transition-all duration-300"
          aria-label="Fechar Menu"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col items-center gap-6 mb-12">
          {[...leftNavItems, ...rightNavItems].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                transitionDelay: `${idx * 75}ms`,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
              className={`font-display text-4xl font-medium transition-all duration-500 hover:text-dental-gold ${activeSection === item.id ? 'text-dental-gold font-semibold' : 'text-dental-ink'
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Social and Conversion CTAs */}
        <div
          className="flex flex-col items-center gap-4 transition-all duration-500 delay-300 w-[80%] max-w-[320px]"
          style={{
            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
        >
          <a
            href="https://wa.me/5571991163943?text=Ol%C3%A1!%20Tenho%20interesse%20de%20realizar%20uma%20avalia%C3%A7%C3%A3o"
            className="relative group overflow-hidden px-8 py-3.5 bg-dental-ink text-white dark:text-dental-bg font-sans text-sm font-bold uppercase tracking-[0.2em] rounded-lg transition-all duration-300 active:scale-95 shadow-lg shadow-dental-ink/10 w-full text-center"
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            </span>
            <span className="relative z-10">Agendar Consulta</span>
          </a>
          <a
            href="https://www.instagram.com/lauralaytynher"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-dental-ink/80 hover:text-dental-gold text-sm py-2.5 px-4 border border-dental-ink/10 rounded-xl transition-all w-full"
          >
            <FiInstagram className="w-4 h-4" /> @lauralaytynher
          </a>
        </div>
      </div>
    </>
  );
}
