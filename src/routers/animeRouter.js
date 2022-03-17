const express = require("express");
const mongoAnimes = require('../config/db/animes');

const animeRouter = express.Router();

animeRouter.route('/').get( async (req,res)=>{
    const response = await mongoAnimes.addManyAnimes();
    res.json(response);
    //res.send('animes')
});


module.exports = animeRouter;
