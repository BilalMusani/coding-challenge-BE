const SCHEMA_URL = process.env.SCEHMA || process.env.NODE_APP_GRAPHQL_URL;

module.exports = {
    schema: [
      {
        [SCHEMA_URL]: {},
      },
    ],
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    overwrite: true,
    generates: {
      "./src/generated/graphql.ts": {
        plugins: [
          "typescript",
          "typescript-operations",
          "typescript-apollo-client-helpers",
        ],
        config: {
          preResolveTypes: true,
          skipTypename: false,
          enumsAsTypes: true,
          constEnums: true,
        },
      },
      './graphql.schema.json': {
          plugins: ['introspection'],
      },
    },
  };