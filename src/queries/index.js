import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import * as healthCheck from './health-check';

export const queries = express.Router();

const typeDefs = [
  gql`
    type Query {
      health: Health
    }
  `,
  healthCheck.typeDefs
];

const resolvers = {
  ...healthCheck.resolvers
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app: queries });
