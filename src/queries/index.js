import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import * as healthCheck from './health-check';
import * as hooks from './hooks';

export const queries = express.Router();

const typeDefs = [
  healthCheck.typeDefs,
  hooks.typeDefs,
  gql`
    type Query {
      ${healthCheck.queryDef}
      ${hooks.queryDef}
    }
  `
];

const resolvers = {
  Query: {
    ...healthCheck.queryResolvers,
    ...hooks.queryResolvers
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app: queries });
