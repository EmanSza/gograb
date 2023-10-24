const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');

router.get('/:id', async (req, res) => {
  const animeId = req.params.id; 
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.getAnimeInfo(animeId);
  await scrapper.closeBrowser();

  res.render('anime', { anime: scrappedResults });
})
router.get("/:id/download-season", async (req, res) => {

});
router.get('/:id/episode/:episode', async (req, res) => {
  // TODO: Get the episode
  // Once Episode gathering works in getAnimeInfo, this will be used to get the episode
   const animeId = req.params.id;
  const episode = req.params.episode;
  console.log(animeId, episode);
  res.render('watch');
})

module.exports = router;