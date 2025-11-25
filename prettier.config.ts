import {type Config} from 'prettier'

/**
 * Prettier configuration file.
 *
 * @see https://prettier.io/docs/configuration
 */
const config: Config = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  bracketSpacing: false,
  semi: false,
  trailingComma: 'none',
  plugins: ['prettier-plugin-tailwindcss']
}

export default config
