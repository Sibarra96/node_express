const express = require('express');
const passport = require('passport');
const mongoUsers = require('../config/db/users');

const authRouter = express.Router();

authRouter.route('/signUp').post(async (req, res) => {
    const { username, password } = req.body;
    const results = await mongoUsers.addUser(username, password);
    console.log(results);
    req.login(results, () => {
        res.redirect('/auth/profile');
    });
});

authRouter.route('/signIn').get((req, res) => {
    res.render('signin');
}).post(
    passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/',
    })
);


authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
})

module.exports = authRouter;