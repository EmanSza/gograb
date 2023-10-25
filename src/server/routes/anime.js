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
  // if query autoplay is true, then add to scrapped results
  const autoPlay = req.query.autoplay;
  const animeId = req.params.id;
  const episode = req.params.episode;
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.getEpisode(animeId, episode);
  await scrapper.closeBrowser();
  if (autoPlay) {
    scrappedResults.autoPlay = true;
  }
  console.log(scrappedResults);
  res.render('watch', { episode: scrappedResults });
})
router.get('/:id/episode/:episode/download', async (req, res) => {
  console.log("downloading episode");
  const animeId = req.params.id;
  const episode = req.params.episode;
  const quality = req.query.quality;
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.downloadEpisode(animeId, episode, quality);
  await scrapper.closeBrowser();
  res.redirect(scrappedResults);
})

module.exports = router;