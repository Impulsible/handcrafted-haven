/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your exact color schema
        primary: {
          DEFAULT: '#8B7355',     // Earthen Brown
          50: '#f9f7f4',
          100: '#f0ece5',
          200: '#e0d8cb',
          300: '#cdbfac',
          400: '#b8a288',
          500: '#8B7355',         // Base
          600: '#7d674d',
          700: '#695742',
          800: '#554736',
          900: '#463a2d',
        },
        secondary: {
          DEFAULT: '#E2725B',     // Terracotta
          50: '#fef6f3',
          100: '#fdeae3',
          200: '#fbd5c8',
          300: '#f8b8a2',
          400: '#f39276',
          500: '#E2725B',         // Base
          600: '#d25d46',
          700: '#b34935',
          800: '#953e2f',
          900: '#7b372a',
        },
        accent: {
          DEFAULT: '#87A96B',     // Sage Green
          50: '#f7f9f4',
          100: '#ecf2e6',
          200: '#d9e5cd',
          300: '#bdd3aa',
          400: '#9dbd80',
          500: '#87A96B',         // Base
          600: '#6d8e54',
          700: '#567144',
          800: '#465a39',
          900: '#3b4b31',
        },
        background: '#FDF6E3',    // Cream
        text: '#2C3E50',          // Charcoal
        success: '#10B981',       // Emerald
        warning: '#F59E0B',       // Amber
        error: '#EF4444',         // Red
        
        // Semantic colors
        border: 'var(--border-color, #e5e7eb)',
        input: 'var(--input-color, #f3f4f6)',
        ring: 'var(--ring-color, rgba(139, 115, 85, 0.3))',
        card: '#ffffff',
        'card-foreground': '#2C3E50',
        popover: '#ffffff',
        'popover-foreground': '#2C3E50',
        muted: '#f9fafb',
        'muted-foreground': '#6b7280',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body': ['"Open Sans"', 'sans-serif'],
        'accent': ['"Dancing Script"', 'cursive'],
      },
      borderRadius: {
        'organic': '6px',
        'lg': '9px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'organic': '0 4px 12px rgba(139, 115, 85, 0.1)',
        'organic-lg': '0 10px 25px rgba(139, 115, 85, 0.15)',
        'organic-sm': '0 2px 4px rgba(139, 115, 85, 0.05)',
        'handcrafted': '0 4px 14px 0 rgba(139, 115, 85, 0.1), 0 1px 4px 0 rgba(139, 115, 85, 0.06)',
      },
      backgroundImage: {
        'gradient-artisan': 'linear-gradient(to bottom right, #FDF6E3 0%, rgba(253, 246, 227, 0.95) 50%, rgba(139, 115, 85, 0.05) 100%)',
        'gradient-button': 'linear-gradient(to right, #8B7355 0%, #E2725B 100%)',
        'gradient-accent': 'linear-gradient(to right, #87A96B 0%, #10B981 100%)',
        'texture-paper': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
