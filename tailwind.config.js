module.exports = {
  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' }
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/custom-forms')]
};
