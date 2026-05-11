import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          subtle: '#ede9fe',
        },
        accent: '#f472b6',
        dark: {
          DEFAULT: '#0a0a0a',
          surface: '#111111',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
