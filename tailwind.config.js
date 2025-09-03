/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // Optimizations
  corePlugins: {
    // Desabilita plugins não utilizados para reduzir bundle
    preflight: true,
    container: false, // Se não usar container
  },
  
  theme: {
    extend: {
      // Configurações customizadas para melhor responsividade
      screens: {
        'xs': '475px',
        // Breakpoints padrão do Tailwind:
        // 'sm': '640px',
        // 'md': '768px', 
        // 'lg': '1024px',
        // 'xl': '1280px',
        // '2xl': '1536px'
        '3xl': '1920px', // Para telas ultra-wide
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      
      // Otimizações de performance
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      // Cores otimizadas (apenas as que realmente usamos)
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
