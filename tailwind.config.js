/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e12c33', // red-500, updated to red as requested
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
        green: {
          DEFAULT: 'rgb(5, 122, 85)',   // base green
          100: 'rgb(160, 204, 171)',    // light green
          300: 'rgb(0, 153, 106)',      // medium green
          500: 'rgb(5, 122, 85)',       // your original green
          700: 'rgb(2, 92, 64)',        // dark green
          900: 'rgb(0, 55, 39)',        // darkest green
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
  plugins: [],
}
