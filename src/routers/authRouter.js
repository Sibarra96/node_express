const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    const { username, password } = req.body;
    const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
    const dbName = 'globomantics';

    (async function addUser() {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            const user = {username,password};
            const db = await client.db(dbName);            
            const results = db.collection('users').insertOne(user);
            console.log(results);
            req.login(results.ops[0], () => {
                res.redirect('/auth/profile');
            });
        } catch (error) {
            console.log(error);
        }
    }());
});

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
})

module.exports = authRouter;