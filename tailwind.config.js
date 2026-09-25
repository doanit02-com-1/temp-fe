/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#018838',
        secondary: '#F0F0F0',
      },
      width: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      height: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
    },
  },
  plugins: [],
};
