const { MongoClient } = require('mongodb');

const dbName = 'globomantics';
const url = `mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority`;


const mongoUsers = {
    addUser: async (username, password) => {
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

            const db = client.db(dbName);
            const user = { username, password };
            const results = await db.collection('users').insertOne(user);
            // console.log(results);
            return results.ops[0];
        } catch (error) {
            console.log(error);
        }finally{
            client.close();
        }
    },
    validateUser: async (username, password,done) => {
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log('Connected to the mongo DB');

            const db = client.db(dbName);

            const user = await db.collection('users').findOne({ username });

            if (user && user.password === password) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (error) {
            console.log(error);
        }finally{
            client.close();
        }
    }
}

module.exports = mongoUsers;