const { MongoClient, ObjectID } = require('mongodb');
const animes = require('../../data/animes.json');

function animesRepo() {
    const url = 'mongodb+srv://Saibarra:jzG9ZYvmzanUw8EF@globomantics.fjejk.mongodb.net/${dbName}?retryWrites=false&w=majority';
    const dbName = 'globomantics';


    function addManyAnimes() {
        return new Promise(async (resolve, reject) => {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            try {
                console.log('Connected to mongo DB');
                const db = client.db(dbName);
                const response = await db.collection('animes').insertMany(animes);
                resolve(response);
            } catch (err) {
                reject(err);
            } finally {
                client.close();
            }
        });
    }
    function getAnimes() {
        return new Promise(async (resolve, reject) => {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            try {
                console.log('Connected to mongo DB');

                const db = client.db(dbName);

                const animes = await db.collection('animes').find().toArray();
                resolve(animes);
            } catch (err) {
                reject(err);
            } finally {
                client.close();
            }
        });
    }
    function getAnimeById(id) {
        return new Promise(async (resolve, reject) => {
            client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            try {
                const db = client.db(dbName);

                const anime = await db.collection('animes').findOne({ _id: ObjectID(id) });
                resolve(anime);
            } catch (err) {
                reject(err);
            } finally {
                client.close();
            }
        })
    }

    return { addManyAnimes, getAnimes, getAnimeById }
}



module.exports = animesRepo();