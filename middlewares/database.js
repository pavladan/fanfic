import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
console.log("het");
  req.dbClient = client;
  req.db = client.db(process.env.MONGODB_DB);
  await setUpDb(req.db);
  return next();
}