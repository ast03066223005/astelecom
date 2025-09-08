/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ef4444', // red-500, updated to red as requested
          light: '#2dd4bf',   // teal-400, lighter shade for hovers, accents
          dark: '#134e4a',    // teal-900, for dark backgrounds
        },
        brand: {
          DEFAULT: '#0d9488', // same as primary for strong brand identity
          dark: '#134e4a',    // dark brand
        },
        secondary: {
          DEFAULT: '#fbbf24', // amber-400, for highlights, buttons
          dark: '#b45309',    // amber-800, for dark secondary
        },
        dark: {
          DEFAULT: '#1e293b', // slate-800, for dark backgrounds
          light: '#334155',   // slate-700, for cards, surfaces
          deep: '#0f172a',    // slate-900, for deepest backgrounds
        },
        accent: {
          DEFAULT: '#e11d48', // rose-600, for error, accent
        },
        // You can add more app-specific colors here as needed
      },
      keyframes: {
        load: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        flash: {
          '0%, 100%': { boxShadow: '0 0 10px #0d9488, 0 0 5px #0d9488' },
          '50%': { boxShadow: '0 0 20px #0d9488, 0 0 10px #0d9488' },
        }
      },
      animation: {
        load: 'load 3s linear infinite',
        flash: 'flash 1.5s linear infinite',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
