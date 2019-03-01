import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Health {
    postgres: String
  }
`;

export const queryDef = `
  health: Health
`;

export const queryResolvers = {
  health: () => ({
    postgres: 'Operational'
  })
};
