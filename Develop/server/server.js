const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//importing the apollo server
const { ApolloServer } = require('apollo-server-express');
//importing the typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
//importing the auth middleware
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

//creating the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//using the auth middleware
app.use(authMiddleware);


//connecting the apollo server to the express app

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  //sending the index.html file if no other route is hit
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  });
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
