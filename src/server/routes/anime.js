const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');

router.get('/:id', async (req, res) => {
  console.log("Anime route")
  const animeId = req.params.id; 
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.getAnimeInfo(animeId);
  await scrapper.closeBrowser();

  res.render('anime');
})
router.get('/:id/:episode', async (req, res) => {
  // TODO: Get the episode
  // Once Episode gathering works in getAnimeInfo, this will be used to get the episode
})

module.exports = router;