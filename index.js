const express = require('express');
const gqlMiddleware = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers.js');

const app = express();
const port = process.env.port || 3000;

const schema = buildSchema(readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8'));

// // configurar
// const resolvers = {
//   hello: () => {
//     return 'hello world';
//   },
// };

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
