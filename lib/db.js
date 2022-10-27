const MongoClient = require('mongodb').MongoClient;

const { DB_NAME, DB_URL } = process.env;
console.log({ DB_NAME, DB_URL });

let connection;

async function connectDB() {
  if (connection) return connection;
  let client;

  try {
    client = await MongoClient.connect(DB_URL + '/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // connection = client.db(DB_NAME);
  } catch (error) {
    console.log('No se pudo conectar a la base de datos de mongo', DB_URL, error);
    process.exit(1);
  }
  // return connection;
  return client.db();
}

module.exports = { connectDB };
