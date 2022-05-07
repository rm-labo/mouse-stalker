// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  important: true,
  content: ['./src/**/*.{pug,html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      black: 'rgb(100, 116, 139)', // '#25322f',
      white: '#ffffff',
      // gray: colors.gray,
      slate: colors.slate,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
