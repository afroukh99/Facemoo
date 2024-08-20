/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:"jit",
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logo: 'var(--logo)',

        hvr: 'var(--hvr-color)',
        bgk: {
          1: 'var(--bg-primary)',
          2: 'var(--bg-secondary)',
          3:'var(--bg-search)',
        },
        border: 'var(--border)',
        txt: {
          1: 'var(--text-primary)',
          2: 'var(--text-secondary)',
          3: 'var(--text-tertiary)',
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}