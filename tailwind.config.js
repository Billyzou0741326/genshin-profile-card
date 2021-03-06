module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    aspectRatiio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
