const { MongoClient } = require('mongodb');
const animes = require('../../data/animes.json');

const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
const dbName = 'globomantics';

const mongoAnimes = {
    addManyAnimes: async ()=>{
        let client;
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log('Connected to mongo DB')            ;

            const db = client.db(dbName);

            const response = await db.collection('animes').insertMany(animes);
            return response;
        } catch (error) {
            console.log(error);
        }finally{
            client.close();
        }
    }
}


module.exports = mongoAnimes;