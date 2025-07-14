/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'instrument-sans': ['var(--font-instrument-sans)', 'sans-serif'],
      },
      keyframes: {
        gradientReveal: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        gradientReveal: 'gradientReveal 3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
