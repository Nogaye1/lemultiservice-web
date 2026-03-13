import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#05263B',
        'primary-light': '#073552',
        action: '#449CA1',
        'action-light': 'rgba(68,156,161,0.12)',
        secondary: '#AACBC9',
        body: '#333333',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '10px',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
        'pulse-dot': 'pulseDot 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.5)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(145deg, #05263B 0%, #073552 50%, #0a4060 100%)',
      },
    },
  },
  plugins: [],
}
export default config
