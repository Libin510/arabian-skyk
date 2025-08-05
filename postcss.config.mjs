const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        xss: "560px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xlx: "1360px",
        "2xl": "1440px",
        "2xxl": "1540px",
        "3xl": "1690px",
        "4xl": "1800px",
        "5xl": "2000px",
        "6xl": "2400px",
      },
      fontFamily: {
        "instrument-sans": ["var(--font-instrument-sans)", "sans-serif"],
      },
    },
  },
};

export default config;
