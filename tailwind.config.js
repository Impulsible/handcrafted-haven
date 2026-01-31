/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Next.js default structure
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // If using src directory structure
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    
    // Include any other directories where you use Tailwind
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced color schema for better contrast
        primary: {
          DEFAULT: '#7d5f45',     // Darker, richer Earthen Brown
          50: '#f9f7f4',
          100: '#f0ece5',
          200: '#e0d8cb',
          300: '#cdbfac',
          400: '#b8a288',
          500: '#7d5f45',         // Darker base
          600: '#6d4f35',
          700: '#5d3f25',
          800: '#4d2f15',
          900: '#3d1f05',
        },
        secondary: {
          DEFAULT: '#D25D46',     // Richer Terracotta
          50: '#fef6f3',
          100: '#fdeae3',
          200: '#fbd5c8',
          300: '#f8b8a2',
          400: '#f39276',
          500: '#D25D46',         // Richer base
          600: '#c24d36',
          700: '#b23d26',
          800: '#a22d16',
          900: '#921d06',
        },
        accent: {
          DEFAULT: '#6D8E54',     // Deeper Sage Green
          50: '#f7f9f4',
          100: '#ecf2e6',
          200: '#d9e5cd',
          300: '#bdd3aa',
          400: '#9dbd80',
          500: '#6D8E54',         // Deeper base
          600: '#5d7e44',
          700: '#4d6e34',
          800: '#3d5e24',
          900: '#2d4e14',
        },
        background: '#FDF6E3',    // Cream
        foreground: '#0A1222',    // Much darker for excellent contrast
        text: {
          DEFAULT: '#0A1222',     // Near black for main text
          muted: '#334155',       // Dark slate for secondary text
          light: '#4B5563',       // For less important text
        },
        success: '#059669',       // Darker Emerald
        warning: '#D97706',       // Darker Amber
        error: '#DC2626',         // Darker Red
        
        // Semantic colors
        border: 'rgba(125, 95, 69, 0.3)',
        input: '#ffffff',
        ring: 'rgba(125, 95, 69, 0.4)',
        card: '#ffffff',
        'card-foreground': '#0A1222',
        popover: '#ffffff',
        'popover-foreground': '#0A1222',
        muted: '#f8fafc',
        'muted-foreground': '#475569',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body': ['"Open Sans"', 'sans-serif'],
        'accent': ['"Dancing Script"', 'cursive'],
        'dancing': ['"Dancing Script"', 'cursive'],
        'opensans': ['"Open Sans"', 'sans-serif'],
        'playfair': ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        'organic': '6px',
        'lg': '9px',
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'organic': '0 4px 12px rgba(125, 95, 69, 0.15)',
        'organic-lg': '0 10px 25px rgba(125, 95, 69, 0.2)',
        'organic-sm': '0 2px 4px rgba(125, 95, 69, 0.1)',
        'handcrafted': '0 4px 14px 0 rgba(125, 95, 69, 0.15), 0 1px 4px 0 rgba(125, 95, 69, 0.08)',
        'contrast': '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-artisan': 'linear-gradient(to bottom right, #FDF6E3 0%, rgba(253, 246, 227, 0.98) 50%, rgba(125, 95, 69, 0.1) 100%)',
        'gradient-button': 'linear-gradient(to right, #7d5f45 0%, #D25D46 100%)',
        'gradient-accent': 'linear-gradient(to right, #6D8E54 0%, #059669 100%)',
        'gradient-text': 'linear-gradient(to right, #7d5f45, #D25D46)',
        'gradient-pottery': 'linear-gradient(135deg, #7d5f45 0%, #D25D46 100%)',
        'gradient-jewelry': 'linear-gradient(135deg, #C19B2D 0%, #E6C000 100%)',
        'gradient-woodwork': 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
        'gradient-textiles': 'linear-gradient(135deg, #6D8E54 0%, #87A96B 100%)',
        'texture-paper': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-in-horizontal': 'slide-in-horizontal 0.5s ease-out',
        'promo-slide': 'promo-slide 5s ease-in-out forwards',
        'promo-pulse': 'promo-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.9' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-horizontal': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'promo-slide': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '5%, 95%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-100%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
