/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all file types you're using in src folder
  ],
  theme: {
    extend: {},
    container: {
      center: true, // Ensure the container is centered
      padding: "1rem", // Add some padding to the container
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
