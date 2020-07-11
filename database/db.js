const MongoClient = require("mongodb").MongoClient;
let dbo = null;

const initMongo = async (url) => {
  if (!dbo) {
    const mongo = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    dbo = mongo.db("eCommerce");
    console.log("Connection to Mongo established!");
  }
  return dbo;
};
const getDb = (collectionName) => {
  if (!dbo) {
    console.log("DBO not instantated, call init please!");
    return;
  }
  return dbo.collection(collectionName);
};
module.exports = { getDb, initMongo };
