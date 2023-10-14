const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');

router.get('/:id', async (req, res) => {
    console.log("Anime route")
  const animeId = req.params.id; 

    const scrapper = new Scrapper();
    await scrapper.startBrowser();

    let scrappedResults = await scrapper.getAnimeInfo(animeId);

    console.log(scrappedResults.episodes);

    await scrapper.closeBrowser();

  res.render('anime');
  
})

module.exports = router;