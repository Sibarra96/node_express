const express = require('express');
const morgan = require('morgan');
const path = require('path');


const PORT = process.env.PORT || 3000;
const app = express();
const sessionRouter = require('./src/routers/sessionRouter');

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname,'/public')));

app.set('views','./src/views');
app.set('view engine','ejs');



app.use('/sessions',sessionRouter);

app.get('/',(req,res) =>{
    res.render('index',{title: 'Welcome to Globomantics', data:['a','b','c']});
});

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});