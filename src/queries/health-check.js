import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Health {
    postgres: String
  }
`;

export const resolvers = {
  Query: {
    health: () => ({
      postgres: 'Operational'
    })
  }
};
