import { useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp, FaGithub } from 'react-icons/fa';

interface FooterProps {
  theme?: string;
}

export default function Footer({ theme = 'dark-blue' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [question, setQuestion] = useState('');

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !question.trim()) return;

    const formattedText = `Olá Dra., meu nome é ${name.trim()} e eu queria tirar uma dúvida com vc: ${question.trim()}`;
    const whatsappUrl = `https://wa.me/5571991163943?text=${encodeURIComponent(formattedText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer
      className="pt-12 pb-6 border-t border-dental-lineSoft/60 bg-dental-bg transition-colors duration-500 relative overflow-hidden"
      aria-label="Rodapé institucional"
    >
      {/* Decorative radial blur background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-dental-gold/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="w-[92%] max-w-[1240px] mx-auto relative z-10">

        {/* Top Part: Logo, Newsletter & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start mb-8 md:mb-10">

          {/* Left Block: Monogram & Newsletter */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start gap-4">

            <div className="flex flex-col items-center md:items-start gap-4 w-full max-w-[340px]">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 bg-dental-gold flex-shrink-0"
                  style={{
                    maskImage: "url('./assets/images/icon.webp')",
                    WebkitMaskImage: "url('./assets/images/icon.webp')",
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center'
                  }}
                  aria-label="Laura Laytynher"
                />
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.18em] text-dental-muted">
                  Ficou com alguma dúvida?
                </span>
              </div>
              <form
                onSubmit={handleWhatsappSubmit}
                className="flex flex-col gap-3 w-full"
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-dental-cardBg/60 dark:bg-white/10 border border-dental-lineSoft/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-dental-ink dark:text-white placeholder-dental-muted/50 dark:placeholder-white/30 outline-none focus:border-dental-gold/60 focus:ring-1 focus:ring-dental-gold/30 transition-all duration-300 shadow-sm"
                  />
                </div>
                <div className="relative w-full">
                  <textarea
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Sua dúvida ou mensagem..."
                    rows={2}
                    className="w-full bg-dental-cardBg/60 dark:bg-white/10 border border-dental-lineSoft/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-dental-ink dark:text-white placeholder-dental-muted/50 dark:placeholder-white/30 outline-none focus:border-dental-gold/60 focus:ring-1 focus:ring-dental-gold/30 transition-all duration-300 shadow-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="relative w-full group overflow-hidden py-3 bg-[#25D366] hover:bg-[#1ebe5a] rounded-xl transition-all duration-300 hover:-translate-y-[2px] active:translate-y-0 shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/30 flex items-center justify-center"
                >
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                    Falar com Dra. Laura
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Block: Navigation Columns — hidden on mobile, visible on md+ */}
          <div className="hidden md:grid md:col-span-7 grid-cols-2 sm:grid-cols-4 gap-8 md:gap-4 w-full">
            {/* Col 1 */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-dental-muted/70 font-semibold mb-4 block">
                Tratamentos
              </span>
              <div className="flex flex-col gap-2.5">
                <a href="#tratamentos" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Estética</a>
                <a href="#tratamentos" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Prótese</a>
                <a href="#tratamentos" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Clareamento</a>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-dental-muted/70 font-semibold mb-4 block">
                Consultório
              </span>
              <div className="flex flex-col gap-2.5">
                <a href="#sobre" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Sobre a Dra.</a>
                <a href="#ambiente" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">O Espaço</a>
                <a href="#contato" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Contato</a>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-dental-muted/70 font-semibold mb-4 block">
                Informações
              </span>
              <div className="flex flex-col gap-2.5 text-[12.5px] text-dental-muted font-light">
                <span>CRO-BA 28.230</span>
                <span>Alpha Medical</span>
                <span>Salvador - BA</span>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-dental-muted/70 font-semibold mb-4 block">
                Redes Sociais
              </span>
              <div className="flex flex-col gap-2.5">
                <a href="https://www.instagram.com/lauralaytynher" target="_blank" rel="noopener noreferrer" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">Instagram</a>
                <a href="https://wa.me/5571991163943" target="_blank" rel="noopener noreferrer" className="text-[12.5px] text-dental-ink/80 hover:text-dental-gold transition-colors font-light">WhatsApp</a>
              </div>
            </div>
          </div>

        </div>

        {/* Big Signature Wordmark & Back to Top */}
        <div className="border-t border-dental-lineSoft/60 pt-8 flex flex-col items-center relative">
          {/* Back to Top Floating Button */}
          <button
            onClick={handleScrollToTop}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dental-bg border border-dental-lineSoft hover:border-dental-gold hover:text-dental-gold transition-all duration-300 flex items-center justify-center text-dental-ink shadow-md hover:-translate-y-1"
            title="Voltar ao topo"
          >
            <FiArrowUp className="w-5 h-5" />
          </button>

          {/* Gigantic Luxury Brand Logo (Vector Masked with Theme Adaptive Color) */}
          <div className="w-full flex justify-center py-4 select-none my-2">
            <div
              className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] h-16 sm:h-20 md:h-24 bg-dental-gold opacity-90 transition-colors duration-500"
              style={{
                maskImage: "url('./assets/images/logohorizontal.webp')",
                WebkitMaskImage: "url('./assets/images/logohorizontal.webp')",
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
              }}
              aria-label="Laura Laytynher Odontologia"
            />
          </div>

          {/* Bottom Copyright Meta Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 mt-4 text-[11px] text-dental-muted font-light tracking-wide">
            <span>
              © {currentYear} Laura Laytynher. Todos os direitos reservados.
            </span>

            {/* Developer Signature Links */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.18em] text-dental-muted/70">
                Desenvolvido por
              </span>
              <a
                href="https://github.com/pedrosoares0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity flex items-center"
                title="Desenvolvido por Pedro Soares"
              >
                <div
                  className="h-5 w-24 bg-dental-gold"
                  style={{
                    maskImage: "url('./assets/images/minha-logo.png')",
                    WebkitMaskImage: "url('./assets/images/minha-logo.png')",
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'left center',
                    WebkitMaskPosition: 'left center'
                  }}
                />
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="https://wa.me/5571993217001?text=Ol%C3%A1%20Pedro!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#e8f8f0] dark:bg-[#112a1d] border border-[#d1f2e0] dark:border-[#1f4a33] text-[#128c7e] dark:text-[#25d366] hover:scale-105 hover:bg-[#d1f2e0] dark:hover:bg-[#1c4731] transition-all duration-300 shadow-sm"
                  title="Falar com Pedro"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/pedrosoares0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-[#eef2ff] dark:bg-[#161b33] border border-[#e0e7ff] dark:border-[#252c54] text-[#4f46e5] dark:text-[#818cf8] hover:scale-105 hover:bg-[#e0e7ff] dark:hover:bg-[#20274c] transition-all duration-300 shadow-sm"
                  title="GitHub do Pedro"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
