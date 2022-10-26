const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`);

// configurar
const resolvers = {
  hello: () => {
    return 'hello world';
  },
  saludo: () => {
    return 'hello everyone';
  },
};

graphql(schema, '{ hello, saludo }', resolvers).then((data) => {
  console.log(data);
});
