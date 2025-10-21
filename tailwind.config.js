/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        'solana-purple': '#9945FF',
        'solana-green': '#14F195',
      },
      backdropBlur: {
        '4xl': '80px',
        '5xl': '100px',
      },
      animation: {
        'star-btn': 'star-btn calc(var(--duration, 3) * 1s) linear infinite',
      },
      keyframes: {
        'star-btn': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
      },
    },
  },
  plugins: [],
}
