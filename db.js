const MongoClient = require('mongodb').MongoClient;

const { DB_NAME, DB_URL } = process.env;

let connection;

async function connectDB() {
  if (connection) return connection;
  let client;

  try {
    client = await MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    connection = client.db(DB_NAME);
  } catch (error) {
    console.log('No se pudo conectar a la base de datos de mongo', uri, error);
    process.exit(1);
  }
  return connection;
}

module.exports = { connectDB };
