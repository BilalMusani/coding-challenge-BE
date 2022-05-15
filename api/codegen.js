module.exports = {
    schema: [
      {
        "http://localhost:8080/v1/graphql": {},
      },
    ],
    documents: ['./src/**/*.tsx', './src/**/*.ts'],
    overwrite: true,
    generates: {
      "./src/generated/graphql.tsx": {
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