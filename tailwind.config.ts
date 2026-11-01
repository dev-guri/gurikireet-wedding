import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { gold: '#D4AF37', heart: '#C84B4B' }, fontFamily: { script: ['var(--font-script)', 'cursive'], serif: ['var(--font-serif)', 'serif'], sans: ['var(--font-sans)', 'sans-serif'] } } },
  plugins: [],
} satisfies Config;
