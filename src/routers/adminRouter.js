const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
const sessions = require("../data/sessions.json");

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
  const dbName = 'globomantics';
  
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to mongo DB');

      const db = client.db(dbName);

      const response = await db.collection('sessions').insertMany(sessions);
      res.json(response);
    } catch (error) {
      console.log(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;


