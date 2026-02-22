export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#195de6',
          50: '#f0f6ff',
          100: '#e0edff',
          500: '#195de6',
          600: '#1450cc',
          700: '#1043b3',
        },
        background: {
          light: '#f6f6f8',
          dark: '#0a0a0c',
        },
        slate: {
          card: '#111621',
        }
      }
    },
  },
  plugins: [],
}
