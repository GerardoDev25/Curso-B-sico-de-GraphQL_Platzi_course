const express = require('express');
const gqlMiddleware = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const app = express();
const port = process.env.port || 3000;

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// configurar
const resolvers = {
  hello: () => {
    return 'hello world';
  },
};

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
