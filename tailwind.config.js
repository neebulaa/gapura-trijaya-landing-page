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
      warning: '#FFD700',
      danger: '#FF0000',
      blue: '#1d4ed8',
      white: '#f2f2f2',
      disabled: '#9ca3af',
    },
  },
  plugins: [],
};
