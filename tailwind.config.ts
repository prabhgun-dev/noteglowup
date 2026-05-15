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
          DEFAULT: '#F7F2E8',
          50: '#FCF9F2',
          100: '#F7F2E8',
          200: '#EFE7D5',
          300: '#E2D6BC',
          400: '#C9B89A',
        },
        ink: {
          DEFAULT: '#0E0E0E',
          soft: '#1F1F1F',
          mute: '#5C5C5C',
          faint: '#9B9B9B',
        },
        tape: {
          DEFAULT: '#F5E6C3',
          mute: 'rgba(245, 230, 195, 0.7)',
        },
        accent: {
          red: '#E03A1F',
          dot: '#F04438',
        },
        cream: '#FFFBF2',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
        bungee: ['var(--font-bungee)', 'Impact', 'sans-serif'],
        anton: ['var(--font-anton)', 'Impact', 'sans-serif'],
        elite: ['var(--font-elite)', 'Courier New', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(14,14,14,0.06), 0 8px 24px -12px rgba(14,14,14,0.18)',
        lift: '0 3px 6px rgba(14,14,14,0.08), 0 24px 48px -16px rgba(14,14,14,0.25)',
        sticker: '0 1px 0 rgba(0,0,0,0.15), 0 4px 8px -2px rgba(0,0,0,0.18)',
        polaroid: '0 2px 4px rgba(14,14,14,0.1), 0 18px 32px -12px rgba(14,14,14,0.28)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'wiggle': 'wiggle 4s ease-in-out infinite',
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
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
