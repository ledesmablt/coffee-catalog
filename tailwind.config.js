/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '440px',
        sm: '640px',
        md: '900px'
      },
      listStyleType: {
        dashed: {
          content: '"-"'
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'ui-serif'],
        mono: ['Hack', 'ui-monospace']
      }
    }
  },
  plugins: []
}
