const express = require('express');
const cors = require('cors');
const { readFileSync } = require('fs');
const { join } = require('path');
const gqlMiddleware = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
require('dotenv').config();

const resolvers = require('./lib/resolvers.js');

const app = express();
const port = process.env.port || 3000;

const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const isDev = process.env.NODE_ENV !== 'production'

app.use(cors());
app.use(
  '/api',
  gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(port, (e) => {
  console.log('*'.repeat(70));
  console.log('server up: ', port);
  console.log('*'.repeat(70));
});
