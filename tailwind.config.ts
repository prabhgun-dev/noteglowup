import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF6EE',
          50: '#FDFBF6',
          100: '#FAF6EE',
          200: '#F2EBDC',
          300: '#E8DFC9',
        },
        ink: {
          DEFAULT: '#1F1B16',
          soft: '#3A332B',
          mute: '#6B6258',
          faint: '#A89E92',
        },
        sage: {
          50: '#F1F4EE',
          100: '#DDE5D4',
          200: '#BFCDB1',
          300: '#9DB28A',
          400: '#7E9669',
          500: '#637A50',
          600: '#4D6040',
        },
        coral: {
          50: '#FBEFEA',
          100: '#F6D9CE',
          200: '#EFB9A6',
          300: '#E69478',
          400: '#D87253',
          500: '#C25737',
        },
        cream: '#FFFBF2',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(31,27,22,0.04), 0 8px 24px -12px rgba(31,27,22,0.12)',
        lift: '0 2px 4px rgba(31,27,22,0.06), 0 24px 48px -16px rgba(31,27,22,0.18)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12 0 0 0 0 0.10 0 0 0 0 0.08 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
