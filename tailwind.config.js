/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.red,
      },
      fontFamily: {
        sans: ['Inter UI var', 'Inter UI', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: ['0.5rem', '1rem'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
