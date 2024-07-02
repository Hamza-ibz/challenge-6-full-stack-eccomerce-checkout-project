// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Specify where Tailwind should look for CSS classes
  theme: {
    fontFamily: {
      primary: 'Poppins', // Define your primary font family
    },
    container: {
      padding: {
        DEFAULT: '30px', // Default padding for containers
        lg: '0', // No padding for large screens
      },
    },
    screens: {
      sm: '640px', // Small screen size
      md: '768px', // Medium screen size
      lg: '1024px', // Large screen size
      xl: '1440px', // Extra large screen size
    },
    extend: {
      colors: {
        primary: '#222222', // Custom primary color
        secondary: '#F5E6E0', // Custom secondary color
      },
      backgroundImage: {
        hero: "url('./public/assets/img/bghero.jpg')", // Custom background image
      },
    },
  },
  plugins: [],
};
