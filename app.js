const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = require('./src/routers/sessionRouter');
const adminRouter = require('./src/routers/adminRouter');
const authRouter = require('./src/routers/authRouter');
const animeRouter = require('./src/routers/animeRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'animes' }));

require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');



app.use('/sessions', sessionRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/animes', animeRouter);

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to Globomantics', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});