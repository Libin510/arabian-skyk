const config = {
  plugins: ["@tailwindcss/postcss"],
   theme: {
    extend: {
       screens: {
        'xs': '475px',
        'laptop': {'min': '1024px', 'max': '1439px'}, // Laptop specific
        '3xl': '1600px',
        'hd': '1920px'
      },
      fontFamily: {
        'instrument-sans': ['var(--font-instrument-sans)', 'sans-serif'],
      }
    }
  }
};

export default config;
