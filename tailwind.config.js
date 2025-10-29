/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: '#0b0e11',
        surface: '#161a1e',
        'surface-hover': '#1e2329',
        border: '#2b3139',
        
        // Text colors
        'text-primary': '#eaecef',
        'text-secondary': '#848e9c',
        'text-muted': '#5e6673',
        
        // Trading colors
        buy: {
          DEFAULT: '#0ecb81',
          hover: '#1ed99a',
        },
        sell: {
          DEFAULT: '#f6465d',
          hover: '#ff5b72',
        },
        
        // Accent
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#60a5fa',
        },
      },
      fontFamily: {
        mono: ['SF Mono', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

