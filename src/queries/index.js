import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

export const queries = express.Router();

const typeDefs = gql`
  type Query {
    health: String
  }
`;

const resolvers = {
  Query: {
    health: () => 'Operational'
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app: queries });
