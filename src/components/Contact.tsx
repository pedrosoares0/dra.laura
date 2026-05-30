import { useEffect, useRef, useState } from 'react';
import { FiMapPin, FiMessageCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado'
];

const TIME_SLOTS = [
  '08:30', '09:30', '10:30', '11:30',
  '14:00', '15:00', '16:00', '17:00'
];

const getNationalHoliday = (day: number, month: number, year: number) => {
  // Static Holidays (day, month - 0-indexed month: Jan is 0, Dec is 11)
  const staticHolidays = [
    { day: 1, month: 0, label: 'Ano Novo (Confraternização Universal)' },
    { day: 21, month: 3, label: 'Tiradentes' },
    { day: 1, month: 4, label: 'Dia do Trabalho' },
    { day: 24, month: 5, label: 'São João (Feriado Regional)' },
    { day: 2, month: 6, label: 'Independência da Bahia (Feriado Estadual)' },
    { day: 7, month: 8, label: 'Independência do Brasil' },
    { day: 12, month: 9, label: 'Nossa Senhora Aparecida' },
    { day: 2, month: 10, label: 'Finados' },
    { day: 15, month: 11, label: 'Proclamação da República' },
    { day: 20, month: 11, label: 'Dia Nacional de Zumbi e da Consciência Negra' },
    { day: 8, month: 11, label: 'Nossa Senhora da Conceição da Praia (Feriado Regional)' },
    { day: 25, month: 11, label: 'Natal' }
  ];

  // Mobile Holidays for 2026 (0-indexed month: Feb is 1, Apr is 3, Jun is 5)
  const mobileHolidays2026 = [
    { day: 17, month: 1, label: 'Carnaval' },
    { day: 3, month: 3, label: 'Sexta-feira Santa' },
    { day: 4, month: 5, label: 'Corpus Christi' }
  ];

  // Mobile Holidays for 2027
  const mobileHolidays2027 = [
    { day: 9, month: 1, label: 'Carnaval' },
    { day: 26, month: 3, label: 'Sexta-feira Santa' },
    { day: 27, month: 4, label: 'Corpus Christi' }
  ];

  const staticMatch = staticHolidays.find(h => h.day === day && h.month === month);
  if (staticMatch) return staticMatch.label;

  if (year === 2026) {
    const mobileMatch = mobileHolidays2026.find(h => h.day === day && h.month === month);
    if (mobileMatch) return mobileMatch.label;
  } else if (year === 2027) {
    const mobileMatch = mobileHolidays2027.find(h => h.day === day && h.month === month);
    if (mobileMatch) return mobileMatch.label;
  }

  return null;
};

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Calendar States
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mouse Hover States for Address Card
  const [isHoveringAddress, setIsHoveringAddress] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHoveringAddress(true);
    if (tooltipRef.current) {
      const tooltipHeight = 265;
      const x = e.clientX - 128; // Center horizontally
      const y = e.clientY - tooltipHeight - 15; // Place 15px above cursor
      tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltipRef.current) {
      const tooltipHeight = 265;
      const x = e.clientX - 128; // Center horizontally
      const y = e.clientY - tooltipHeight - 15; // Place 15px above cursor
      tooltipRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const activeYear = currentDate.getFullYear();
  const activeMonth = currentDate.getMonth();

  const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate();
  const firstDayIndex = new Date(activeYear, activeMonth, 1).getDay(); // 0 is Sunday, 1 is Monday...

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide up contact card with blur reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, filter: 'blur(14px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePrevMonth = () => {
    const today = new Date();
    if (activeYear === today.getFullYear() && activeMonth === today.getMonth()) return;
    setCurrentDate(new Date(activeYear, activeMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(activeYear, activeMonth + 1, 1));
  };

  const isPastDay = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(activeYear, activeMonth, day);
    return dateToCheck < today;
  };

  const isSunday = (day: number) => {
    const date = new Date(activeYear, activeMonth, day);
    return date.getDay() === 0;
  };

  const handleWhatsappConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    const dayName = WEEKDAYS[selectedDate.getDay()];
    const dayFormatted = String(selectedDate.getDate()).padStart(2, '0');
    const monthFormatted = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dateStr = `${dayFormatted}/${monthFormatted}`;

    const text = `Olá Dra. td bom? Queria saber se conseguimos fazer uma avaliação na ${dayName}, ${dateStr} às ${selectedTime}.`;
    const whatsappUrl = `https://wa.me/5571991163943?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-16 md:py-24 bg-dental-bg transition-colors duration-500 relative overflow-hidden"
      aria-label="Agendar Consulta e Contatos"
    >
      {/* Self-contained CSS to hide the scrollbar of the hour panel but keep mouse-wheel/hover scroll fully active */}
      <style>{`
        .time-scroll-container::-webkit-scrollbar {
          display: none !important;
        }
        .time-scroll-container {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Background visual shapes & Split Backdrop Images (lightly blurred & translucent) */}
      <div className="absolute inset-0 w-full h-full flex pointer-events-none select-none z-0 overflow-hidden">
        {/* Left image (ambiente.JPG) */}
        <div className="w-1/2 h-full relative opacity-[0.26] dark:opacity-[0.12] transition-opacity duration-700">
          <img
            src="./assets/images/ambiente.JPG"
            alt=""
            className="w-full h-full object-cover filter blur-[2.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dental-bg via-transparent to-dental-bg" />
        </div>
        {/* Right image (atendimento4.webp) */}
        <div className="w-1/2 h-full relative opacity-[0.26] dark:opacity-[0.12] transition-opacity duration-700">
          <img
            src="./assets/images/atendimento4.webp"
            alt=""
            className="w-full h-full object-cover filter blur-[2.5px]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-dental-bg via-transparent to-dental-bg" />
        </div>
      </div>

      <div className="w-[92%] max-w-[1140px] mx-auto relative z-10">

        {/* Luxury Rounded Contact Container (Always white to match the premium light aesthetic) */}
        <div
          ref={cardRef}
          className="bg-white border border-[#193C70]/10 rounded-[32px] p-5 sm:p-8 md:py-10 md:px-12 shadow-lg transition-all duration-500 relative overflow-hidden"
        >
          {/* Subtle gold lines aesthetic details */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-dental-gold/3 rounded-bl-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

            {/* Left side: Copy & Core CTA */}
            <div className="lg:col-span-5 flex flex-col items-start text-left justify-between lg:self-stretch gap-6">
              <div>
                <span className="text-[11px] font-bold text-dental-gold uppercase tracking-[0.24em] block mb-3">
                  Agendamento Online
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium leading-tight mb-4 text-[#193C70] text-balance">
                  Escolha o seu <span className="font-display italic text-dental-gold tracking-normal">horário</span> ideal
                </h2>

                <p className="text-[14px] sm:text-[15px] text-slate-500 font-light leading-relaxed mb-6 max-w-[440px] text-pretty">
                  Selecione no calendário ao lado o dia e horário que melhor atendem às suas necessidades. Você será direcionada ao WhatsApp da Dra. Laura para confirmar sua consulta de forma rápida e prática.
                </p>
              </div>

              {/* Premium Address Card with Social Shortcut Icons */}
              <div className="flex items-center gap-3 w-full mt-auto">
                {/* WhatsApp Quick Link */}
                <a
                  href="https://wa.me/5571991163943"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#F7F1ED] border border-[#193C70]/10 hover:border-dental-gold/45 hover:bg-[#25D366]/10 text-dental-gold hover:text-[#25D366] flex items-center justify-center flex-shrink-0 transition-all duration-300 group shadow-sm hover:scale-105 active:scale-95"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>

                {/* Instagram Quick Link */}
                <a
                  href="https://www.instagram.com/lauralaytynher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#F7F1ED] border border-[#193C70]/10 hover:border-dental-gold/45 hover:bg-[#E1306C]/10 text-dental-gold hover:text-[#E1306C] flex items-center justify-center flex-shrink-0 transition-all duration-300 group shadow-sm hover:scale-105 active:scale-95"
                  title="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>

                {/* Local Card */}
                <a
                  href="https://maps.app.goo.gl/QdDwq3ioae6NrDc59"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={() => setIsHoveringAddress(false)}
                  onMouseMove={handleMouseMove}
                  className="flex-1 flex items-center justify-between p-4 rounded-2xl bg-[#F7F1ED] border border-[#193C70]/10 hover:border-dental-gold/45 hover:bg-[#ebdcd3] transition-all duration-300 group cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white text-dental-gold flex items-center justify-center border border-[#193C70]/10 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FiMapPin className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                        Consultório
                      </span>
                      <span className="text-[13px] font-bold text-[#193C70] leading-tight">
                        Alpha Medical  Salvador, BA
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-dental-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden xl:inline-flex items-center gap-1">
                    Ver no Mapa →
                  </span>
                </a>
              </div>
            </div>

            {/* Right side: Screen-Accurate Themed Calendar & Time Widget */}
            <div className="lg:col-span-7 w-full flex flex-col gap-4">

              {/* Row 1: Calendar & Time Selector side-by-side */}
              <div className="flex flex-col sm:flex-row gap-4">

                {/* Calendar Card — full-width on mobile, shares row with time selector on sm+ */}
                <div className="w-full sm:flex-1 bg-[#F7F1ED]/50 rounded-3xl p-4 sm:p-5 border border-[#193C70]/10 flex flex-col justify-between shadow-sm">
                  {/* Month header with navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      disabled={activeYear === new Date().getFullYear() && activeMonth === new Date().getMonth()}
                      className="w-8 h-8 rounded-full text-[#193C70]/70 hover:text-dental-gold flex items-center justify-center transition-all duration-300 disabled:opacity-20 disabled:pointer-events-none"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-semibold tracking-wide text-[#193C70]">
                      {MONTHS[activeMonth]} {activeYear}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="w-8 h-8 rounded-full text-[#193C70]/70 hover:text-dental-gold flex items-center justify-center transition-all duration-300"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] font-bold text-[#193C70]/40 uppercase tracking-wider mb-2">
                    <span>Dom</span>
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sab</span>
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
                    {Array.from({ length: firstDayIndex }).map((_, idx) => (
                      <div key={`empty-${idx}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const day = idx + 1;
                      const isPast = isPastDay(day);
                      const isSun = isSunday(day);
                      const holidayLabel = getNationalHoliday(day, activeMonth, activeYear);
                      const isHoliday = !!holidayLabel;

                      const dateObject = new Date(activeYear, activeMonth, day);
                      const isSelected = selectedDate?.toDateString() === dateObject.toDateString();
                      const isToday = new Date().toDateString() === dateObject.toDateString();

                      return (
                        <button
                          key={`day-${day}`}
                          type="button"
                          disabled={isPast || isSun}
                          onClick={() => {
                            if (isHoliday) return;
                            setSelectedDate(dateObject);
                          }}
                          className={`relative aspect-square w-8 sm:w-9 mx-auto flex items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${isPast || isSun
                            ? 'text-[#193C70]/15 cursor-not-allowed pointer-events-none'
                            : isHoliday
                              ? 'text-[#c6a072] hover:bg-[#c6a072]/15 cursor-help border border-dashed border-[#c6a072]/50'
                              : isSelected
                                ? 'bg-[#193C70] text-white font-extrabold scale-110 shadow-sm'
                                : 'text-[#193C70] hover:bg-[#c6a072]/15 hover:scale-105'
                            }`}
                          style={{
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                          title={isHoliday ? `Feriado Nacional: ${holidayLabel}` : undefined}
                        >
                          {day}
                          {isToday && !isSelected && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-dental-gold" />
                          )}
                          {isHoliday && !isSelected && (
                            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#c6a072]/85" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selector Card */}
                <div className="w-full sm:w-[145px] bg-[#F7F1ED]/50 rounded-3xl py-4 sm:py-5 px-3 border border-[#193C70]/10 flex flex-col items-center shadow-sm">
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-3 flex-shrink-0">
                    Horário
                  </span>

                  {/* On mobile: 4-col grid. On sm+: scrollable vertical list */}
                  <div
                    data-lenis-prevent
                    className="time-scroll-container w-full grid grid-cols-4 sm:grid-cols-1 gap-2 sm:overflow-y-scroll sm:overflow-x-hidden sm:h-[260px] px-1 sm:px-2 py-1"
                  >
                    {TIME_SLOTS.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`w-full py-2.5 px-1 sm:px-3 text-xs font-semibold rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isSelected
                            ? 'bg-[#193C70] text-white border-transparent scale-[1.03] font-bold shadow-md shadow-[#193C70]/10'
                            : 'bg-transparent border-[#193C70]/10 text-slate-500 hover:bg-[#c6a072]/15 hover:text-[#193C70]'
                            }`}
                          style={{
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                          }}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Row 2: Selected Preview & Action Bar - Completely hidden unless active */}
              {selectedDate && selectedTime && (
                <div
                  className="bg-[#F7F1ED]/95 border border-[#193C70]/15 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-fade-in"
                >
                  <div className="flex items-center gap-4 text-left w-full sm:w-auto">
                    {/* Left date badge styled to match system variables */}
                    <div className="w-14 h-14 bg-[#193C70] rounded-2xl flex flex-col items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#c6a072]">
                        {MONTHS[selectedDate.getMonth()].substring(0, 3)}
                      </span>
                      <span className="text-xl font-extrabold text-white leading-none mt-0.5">
                        {selectedDate.getDate()}
                      </span>
                    </div>

                    {/* Event Description */}
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#193C70] leading-snug">
                        Avaliação com Dra. Laura Laytynher
                      </span>
                      <span className="text-xs text-slate-500 mt-0.5">
                        {WEEKDAYS[selectedDate.getDay()]} às {selectedTime}
                      </span>
                    </div>
                  </div>

                  {/* Agendar Button */}
                  <button
                    type="button"
                    onClick={handleWhatsappConfirm}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#193C70] hover:bg-[#c6a072] text-white hover:text-slate-900 font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-md flex items-center justify-center transform active:scale-95 hover:-translate-y-0.5"
                  >
                    <span>Agendar</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>

      {/* Dynamic Mouse-Following Address Card Hover Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed pointer-events-none z-[9999] w-64 bg-dental-cardBg/95 dark:bg-[#132f54]/95 border border-dental-lineSoft/60 rounded-2xl overflow-hidden shadow-2xl p-2.5 flex flex-col gap-2 origin-bottom"
        style={{
          left: 0,
          top: 0,
          opacity: isHoveringAddress ? 1 : 0,
          scale: isHoveringAddress ? 1 : 0.95,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'opacity 200ms ease-out, scale 200ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 100ms cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative shadow-sm">
          <img
            src="https://aloalobahia.com/images/p/aplphaentregueconsil_alo_alo_bahia.jpg"
            alt="Alpha Medical Center"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2 pb-1 text-left flex flex-col">
          <span className="text-[10px] font-extrabold text-dental-gold uppercase tracking-widest">
            Alpha Medical Center
          </span>
          <span className="text-[11px] font-medium text-dental-ink mt-0.5 leading-snug">
            Av. Luís Viana Filho, 7416 - Alphaville I, Salvador - BA, 41730-101
          </span>
        </div>
      </div>

    </section>
  );
}
