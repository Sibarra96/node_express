const express = require("express");
const animesRepo = require('../config/db/animes');

const animeRouter = express.Router();

// animeRouter.route('/').get( async (req,res)=>{
//     const response = await  animesRepo.addManyAnimes();
//     res.json(response);
//     //res.send('animes')
// });

animeRouter.route('/').get(async(req,res)=>{
    const animes = await animesRepo.getAnimes();
    res.render('animes',{animes})
})

animeRouter.route('/:id').get(async(req,res)=>{
    const animeId = req.params.id;
    const animes = await animesRepo.getAnimeById(animeId);
    res.render('anime',{anime:animes});
});



module.exports = animeRouter;
