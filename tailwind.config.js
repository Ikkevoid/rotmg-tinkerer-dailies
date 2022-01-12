const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')


module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ChronoType', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [plugin(
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'retro-clip': (value) => ({
            clipPath: `polygon(0 ${value}, ${value} ${value}, ${value} -.5em, calc(100% - ${value}) -.5em, calc(100% - ${value}) ${value}, 100% ${value}, 100% calc(100% - ${value}), calc(100% - ${value}) calc(100% - ${value}), calc(100% - ${value}) 100%, ${value} 100%, ${value} calc(100% - ${value}), 0 calc(100% - ${value}))`
          }),
        },
        { values: theme('borderWidth') }
      )

    }
  )],
}
