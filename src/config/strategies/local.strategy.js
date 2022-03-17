const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const mongoUsers = require('../db/users');

module.exports = function localStrategy() {
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
            },
            (async (username, password, done) => {
                await mongoUsers.validateUser(username, password, done);
            })
        )
    );
};
