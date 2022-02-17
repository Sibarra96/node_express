const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
// const sessions = require('../data/sessions.json');

const sessionRouter = express.Router();

sessionRouter.route('/').get((req, res) => {
    const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
    const dbName = 'globomantics';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions });
        } catch (error) {
            console.log(error.stack);
        }
        client.close();
    })();
});

sessionRouter.route('/:id').get((req, res) => {
    const id = req.params.id;

    const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
    const dbName = 'globomantics';

    (async function mongo() {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to mongo DB');

            const db = client.db(dbName);

            const sessions = await db.collection('sessions').findOne({ _id: new ObjectID(id) });
            res.render('session', { session: sessions });
        } catch (error) {
            console.log(error.stack);
        }
        client.close();
    })();


    // res.render('session' ,{ session:sessions[id]});
});

module.exports = sessionRouter;