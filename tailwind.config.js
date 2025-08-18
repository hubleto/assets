/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "../main/**/*.{html,js,twig,tsx}",
    "../framework/**/*.{tsx,twig}",
    "../apps/**/*.{tsx,twig}",
    "../react-ui/node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hubleto-lookup__indicator',
    'hubleto-lookup__control',
    'hubleto-lookup__input-container',
    'hubleto-lookup__value-container',
    'hubleto-lookup__input',
  ],
  plugins: [],
}

