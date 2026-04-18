/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        secondary: '#F59E0B',
        accent: '#3B82F6',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        border: '#E5E7EB',
        error: '#EF4444',
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}