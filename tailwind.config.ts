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
        // Pantone palette
        dogwood: {
          DEFAULT: '#EDCDC2', // Pale Dogwood 13-1404
          light: '#F4DDD3',
          dark: '#D9B3A5',
        },
        rose: {
          DEFAULT: '#F7CAC9', // Rose Quartz 13-1520
          light: '#FCE1E0',
          dark: '#E8AFAE',
        },
        candy: {
          DEFAULT: '#F4ACB7', // Candy Pink 14-1911 TCX
          light: '#F9C9D2',
          dark: '#E58A99',
        },
        genz: {
          DEFAULT: '#FCD757', // Gen-Z Yellow
          light: '#FFE89C',
          dark: '#E8BC3A',
        },
        sage: {
          DEFAULT: '#C8DDB5',
          light: '#DCEACE',
          dark: '#9DBC85',
        },
        sky: {
          DEFAULT: '#BCDDF0',
          light: '#DCEDF7',
          dark: '#7CB4D6',
        },
        cream: '#FFF8F1',
        ink: {
          DEFAULT: '#1A1212',
          soft: '#2E2222',
          mute: '#6B5A5A',
          faint: '#B4A09F',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
        bungee: ['var(--font-bungee)', 'Impact', 'sans-serif'],
        anton: ['var(--font-anton)', 'Impact', 'sans-serif'],
        elite: ['var(--font-elite)', 'Courier New', 'monospace'],
        print: ['var(--font-patrick)', 'Comic Sans MS', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        paper: '0 1px 2px rgba(26,18,18,0.06), 0 8px 24px -12px rgba(26,18,18,0.18)',
        lift: '0 3px 6px rgba(26,18,18,0.08), 0 24px 48px -16px rgba(26,18,18,0.25)',
        sticker: '0 1px 0 rgba(0,0,0,0.10), 0 4px 8px -2px rgba(229,138,153,0.30)',
        polaroid: '0 2px 4px rgba(26,18,18,0.10), 0 18px 32px -12px rgba(26,18,18,0.25)',
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
