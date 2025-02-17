import { GraphQLScalarType, GraphQLError } from 'graphql';

const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: (value: any) => {
    if (value != null && 'promise' in value) {
      // graphql-upload v10
      return value.promise;
    } else {
      // graphql-upload v9
      return value;
    }
  },
  // serialization requires to support schema stitching
  serialize: value => value,
  parseLiteral: ast => {
    throw new GraphQLError('Upload literal unsupported.', ast);
  },
});

export { GraphQLUpload };
