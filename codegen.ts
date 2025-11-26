import type {CodegenConfig} from '@graphql-codegen/cli'
import 'dotenv/config'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL!,
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
