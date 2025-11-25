import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://blog.nextjswp.com/graphql',
  documents: ['lib/queries/**/*.ts', 'lib/mutations/**/*.ts'],
  generates: {
    './lib/generated.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        avoidOptionals: false,
        maybeValue: 'T | null',
        skipTypename: true,
        enumsAsTypes: true
      }
    }
  },
  ignoreNoDocuments: true
}

export default config
