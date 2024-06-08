/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/**/**/*.{js,ts,jsx,tsx}',
    './src/**/**/**/*.{js,ts,jsx,tsx}',
  ],
  // corePlugins: {
  //   preflight: false,
  // },
  theme: {
    extend: {},
    colors: {
      primary: '#18428F',
      secondary: {
        100: '#E2E2D5',
        200: '#888883',
        300: '#A0A0A0',
      },
      disabled: '#9ca3af',
    },
  },
  plugins: [],
};
