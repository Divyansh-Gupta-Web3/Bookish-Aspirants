import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        flourish: ['var(--font-flourish)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        burgundy: {
          50: '#FBF4F5',
          100: '#F3E5E8',
          200: '#E4C9CF',
          300: '#CFA0AA',
          400: '#B07380',
          500: '#94606D',
          600: '#85505D',
          700: '#793F4B',
          800: '#5E303B',
          900: '#42212A',
        },
        dusty: {
          50: '#FCF7F7',
          100: '#F7ECED',
          200: '#EFD9DD',
          300: '#E3BFC6',
          400: '#D4A6AF',
          500: '#C58D98',
          600: '#AD7480',
          700: '#8E5A65',
          800: '#6A434C',
          900: '#472C33',
        },
        ink: {
          50: '#F7F3F1',
          100: '#ECE5E1',
          200: '#D8CBC4',
          300: '#B9A9A0',
          400: '#957F75',
          500: '#7A6861',
          600: '#62524B',
          700: '#45352F',
          800: '#352A25',
          900: '#221A17',
        },
        parchment: {
          50: '#FAF2E1',
          100: '#F0E2C6',
          200: '#E0CBA3',
          300: '#CDB287',
          400: '#B99A6C',
          500: '#A88C6C',
          600: '#8A7155',
          700: '#6B5741',
          800: '#4C3D2E',
          900: '#33291F',
        },
        sage: {
          50: '#F3F6F1',
          100: '#E3EADF',
          300: '#A9BFA0',
          500: '#6F8C63',
          700: '#4C6244',
          900: '#2C3A27',
        },
        ochre: {
          50: '#FBF6EC',
          100: '#F5E9D0',
          300: '#E0BC73',
          500: '#B8862F',
          700: '#8A6221',
          900: '#533A12',
        },
        brick: {
          50: '#FBF1EF',
          100: '#F4DCD7',
          300: '#E09A8B',
          500: '#B5513F',
          700: '#8A3324',
          900: '#54201A',
        },
      },
      boxShadow: {
        page: '0 1px 2px rgba(69, 53, 47, 0.08), 0 18px 40px -24px rgba(69, 53, 47, 0.45)',
        cover:
          '0 1px 0 rgba(69, 53, 47, 0.25), 0 14px 24px -12px rgba(69, 53, 47, 0.5), 0 4px 8px -4px rgba(69, 53, 47, 0.35)',
        'cover-hover':
          '0 2px 0 rgba(69, 53, 47, 0.25), 0 28px 44px -16px rgba(69, 53, 47, 0.55), 0 8px 14px -6px rgba(69, 53, 47, 0.4)',
        nav: '0 10px 28px -18px rgba(69, 53, 47, 0.45)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -10px, 0) rotate(6deg)' },
        },
        'seal-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(121, 63, 75, 0.35)' },
          '50%': { boxShadow: '0 0 0 10px rgba(121, 63, 75, 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        float: 'float 8s ease-in-out infinite',
        'seal-pulse': 'seal-pulse 2.8s ease-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
