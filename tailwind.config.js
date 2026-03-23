/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        pixel: {
          bg: '#0f0f23',
          card: '#1a1a3e',
          border: '#3b3b6b',
          accent: '#7c3aed',
          green: '#22c55e',
          yellow: '#eab308',
          red: '#ef4444',
          cyan: '#06b6d4',
        },
      },
      boxShadow: {
        pixel: '4px 4px 0px 0px rgba(124,58,237,0.8)',
        'pixel-sm': '2px 2px 0px 0px rgba(124,58,237,0.8)',
      },
    },
  },
  plugins: [],
}
