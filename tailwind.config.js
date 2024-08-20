/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    darkMode: 'class',
    colors: {
      'custom-gray': '#f5f5f5',
      'custom-blue': '#3b82f6',
      'primary-5': 'var(--clr-primary-5)',
      cream: '#f5f5dc',
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in-out',
      'spin-slow': 'spin 3s linear infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 }
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },

  },
  plugins: [
    require('flowbite/plugin')
  ],
};
