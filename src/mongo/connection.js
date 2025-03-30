const { MongoClient } = require('mongodb');
require('dotenv').config();

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
i

async function testConnection() {

  const uri = `mongodb+srv://${username}:${password}@nodecluster.cufafqj.mongodb.net/?retryWrites=true&w=majority&appName=nodeCluster`;
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Conexão bem-sucedida!');
    const databases = await client.db().admin().listDatabases();
    console.log('Databases:', databases.databases.map(db => db.name));
  } catch (error) {
    console.error('Erro de conexão:', error);
  } finally {
    await client.close();
  }
}

testConnection();