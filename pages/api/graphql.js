import { ApolloServer, gql } from 'apollo-server-micro';
import data from './data.json';

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const typeDefs = gql`
  type Query {
    users: [User!]!
    
    user(id:String!): User!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type User {
    id: String
    name: String
    color: String
    married: String
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return data.users;
    },
    user(parent, args, context) {
      return data.users.find( user => user.id === parseInt( args.id ) );
    }
  },
  Mutation: {
    post(parent, args, context) {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });