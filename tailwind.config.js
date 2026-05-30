/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", ".dark-blue"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dental: {
          bg: 'var(--bg)',
          bgAlt: 'var(--bg-alt)',
          ink: 'var(--ink)',
          gold: 'var(--gold)',
          goldSoft: 'var(--gold-soft)',
          surface: 'var(--surface)',
          cardBg: 'var(--card-bg)',
          lineSoft: 'var(--line-soft)',
          muted: 'var(--muted)',
          mutedSoft: 'var(--muted-soft)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['BehindTheNineties', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
      })
    },
  ],
}
