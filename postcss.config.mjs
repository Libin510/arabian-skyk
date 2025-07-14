const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      fontFamily: {
        'instrument-sans': ['var(--font-instrument-sans)', 'sans-serif'],
      },
     keyframes: {
        slideTriangle: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideTriangle: 'slideTriangle 0.4s ease-out forwards',
      },
    },
  },
};

export default config;
