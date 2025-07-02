/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#F0F7F4',
          100: '#DCEDE4',
          200: '#BBD9CB',
          300: '#8FC0A9',
          400: '#5FA085',
          500: '#40876A',
          600: '#2D6A4F',
          700: '#1B4332',
          800: '#0F2A1F',
          900: '#081B15'
        },
        gold: {
          50: '#FDF8F0',
          100: '#F9EDDC',
          200: '#F2D9B3',
          300: '#E8C085',
          400: '#D4A574',
          500: '#C1945A',
          600: '#A07C47',
          700: '#7D633A',
          800: '#5A4730',
          900: '#3D2F20'
        },
        cream: {
          50: '#FEFDFB',
          100: '#F8F5F0',
          200: '#F1EBE0',
          300: '#E8DFD0',
          400: '#DDD1BD',
          500: '#CFC1A6',
          600: '#BAA887',
          700: '#9D8B6B',
          800: '#7A6B51',
          900: '#5A503C'
        }
      },
      fontFamily: {
        'arabic': ['Amiri', 'serif'],
        'urdu': ['Noto Sans Arabic', 'sans-serif'],
        'display': ['Amiri', 'serif']
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      backgroundImage: {
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F0F7F4' fill-opacity='0.3'%3E%3Cpath d='M30 0L0 30L30 60L60 30L30 0ZM30 15L45 30L30 45L15 30L30 15Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }
    },
  },
  plugins: [],
}