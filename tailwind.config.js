// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
      },
      colors: {
        cyan: {
          400: '#26C6DA',
          500: '#25BCD0',
          600: '#22ACBF',
        },
        smoke: {
          100: '#F5F5F5',
          200: '#EBEBEB',
          800: '#474A48',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-gradient': 'linear-gradient(to top left, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.1) 25%, transparent 100%)',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        // Assuming you want to apply this to a default theme, which could be 'light' or 'dark'
        light: { // or 'dark' if you want to apply it to the dark theme
          colors: {
            primary: {
              DEFAULT: '#26C6DA', // Cyan 400 as primary color
              // Add other shades if necessary
            },
            // Define a custom gradient property for the theme if needed
            gradient: {
              from: 'rgba(6, 182, 212, 0.1)', // Start of your custom gradient
              via: 'rgba(6, 182, 212, 0.25)', // Mid of your custom gradient
              to: 'transparent', // End of your custom gradient
            },
          },
        },
      },
    }),
  ],
};
