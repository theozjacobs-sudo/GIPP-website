import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gipp: {
          orange: '#E8752A',
          'orange-light': '#F29650',
          'orange-dark': '#C85A19',
          'orange-muted': '#D4894D',
          cream: '#F5D6A0',
          'cream-light': '#FFF7ED',
          red: '#B22222',
          'red-dark': '#8B1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #E8752A 0%, #C85A19 50%, #B22222 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee-scroll 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(232, 117, 42, 0.4)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(232, 117, 42, 0.7)' },
        },
      },
      boxShadow: {
        'brutal': '4px 4px 0 0 #8B1A1A',
        'brutal-lg': '6px 6px 0 0 #8B1A1A',
        'brutal-orange': '4px 4px 0 0 #E8752A',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
