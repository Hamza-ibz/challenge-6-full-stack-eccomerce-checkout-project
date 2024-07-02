module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Include all relevant file types in the src directory
  theme: {
    fontFamily: {
      primary: ['Poppins', 'sans-serif'],
    },
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero: "url('/src/assets/img/bghero.jpg')", // Update the path to match your project structure
      },
    },
  },
  plugins: [],
};
