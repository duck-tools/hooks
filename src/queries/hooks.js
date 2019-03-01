import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Hook {
    event: String
    listener: String
  }
`;

export const queryDef = `
  hooks: [Hook]
`

export const queryResolvers = {
  hooks: () => [{
    event: 'pickupline.broadcast',
    listener: 'some url'
  }]
};
