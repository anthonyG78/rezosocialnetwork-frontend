import { ApolloClient, createNetworkInterface } from 'apollo-client';
import Basil from 'basil.js';

const storage = new Basil({
  storages: ['local'],
  storage: 'local',
});

const networkInterface = createNetworkInterface({
  uri: process.env.graphql.url,
});

networkInterface
  .use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        // Create the header object if needed.
        req.options.headers = {};
      }
      // get the authentication token from local storage if it exists
      const token = storage.get('token');
      req.options.headers.authorization = token ? `JWT ${token}` : null;
      next();
    },
  }]);

const client = new ApolloClient({
  networkInterface,
  connectToDevTools: true,
});

export default client;
