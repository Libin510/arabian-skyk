const config = {
  plugins: ["@tailwindcss/postcss"],
   theme: {
    extend: {
      fontFamily: {
        'instrument-sans': ['var(--font-instrument-sans)', 'sans-serif'],
      }
    }
  }
};

export default config;
