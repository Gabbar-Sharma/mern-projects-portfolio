/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#10233F',
        accent: '#155EEF',
        soft: '#F3F6FA',
        surface: '#FFFFFF',
        text: '#172033',
        muted: '#667085',
        success: '#16A36A',
        error: '#D92D20',
        border: '#E4E7EC',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(16, 35, 63, 0.08)',
      },
    },
  },
  plugins: [],
}
