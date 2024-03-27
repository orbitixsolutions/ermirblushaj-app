import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#9FC131',
        'custom-teal': '#005C53',
        'custom-navy': '#042940',
        'custom-blue': '#3F97FF',
        'custom-gray': '#8F8F8F',
        'custom-lightgray': '#D8D8D8',
        'custom-white': '#FFFFFF',
        'custom-darkblue': '#16374B',
        'custom-red': '#FF3A3A',
        'custom-darknavy': '#052335',
          
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}
export default config