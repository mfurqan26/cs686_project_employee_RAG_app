import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["../server/src/schema.gql"],
  documents: ["src/**/*.ts"],
  noSilentErrors: true,
  generates: {
    "./src/api-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        preResolveTypes: true,
        namingConvention: "keep",
        avoidOptionals: { field: true },
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
        skipTypename: true,
      },
    },
  },
};

export default config;
