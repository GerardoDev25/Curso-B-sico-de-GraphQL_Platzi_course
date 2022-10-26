const express = require('express');
const gqlMiddleware = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers.js');

const app = express();
const port = process.env.port || 3000;

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8');

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  '/api',
  gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, (e) => {
  console.log('server up: ', port);
});
