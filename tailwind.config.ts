import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#ffffff',
          2: '#f7f5ef',
          3: '#ece8dd',
        },
        ink: {
          DEFAULT: '#2a2825',
          2: '#1a1815',
          3: '#6e6a62',
          4: '#a8a397',
        },
        line: {
          DEFAULT: '#e7e2d4',
          2: '#cdc6b3',
        },
        gold: {
          DEFAULT: '#a88a4f',
          soft: '#c9b07a',
          deep: '#8c7038',
        },
        // Legacy aliases for backward compat
        cream: {
          DEFAULT: '#f7f5ef',
          50: '#fdfcfa',
          100: '#f7f5ef',
          200: '#ece8dd',
          300: '#e7e2d4',
          400: '#cdc6b3',
        },
        charcoal: {
          DEFAULT: '#2a2825',
          50: '#f5f4f2',
          100: '#e8e6e2',
          200: '#d0cdc7',
          300: '#a8a397',
          400: '#6e6a62',
          500: '#4a4742',
          600: '#3a3733',
          700: '#2a2825',
          800: '#1a1815',
          900: '#1a1815',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        luxury: '0.15em',
        'luxury-wide': '0.25em',
        'luxury-widest': '0.35em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.4, 0.25, 1)',
      },
      borderRadius: {
        DEFAULT: '2px',
      },
    },
  },
  plugins: [],
}

export default config
