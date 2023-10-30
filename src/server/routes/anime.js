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
router.get("/:id/download", async (req, res) => {
  const animeId = req.params.id;
  // get the anime info
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.getAnimeInfo(animeId);
  await scrapper.closeBrowser();
  res.render('download', { anime: scrappedResults });

});
router.get('/:id/episode/:episode', async (req, res) => {
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
router.post('/:id/:episode/download', async (req, res) => {
  // Will loop FROM THE CLIENT SIDE so we just download one episode at a time
  const animeId = req.params.id;
  const episode = req.params.episode;
  const quality = req.body.quality;
  const scrapper = new Scrapper();
  await scrapper.startBrowser();
  let scrappedResults = await scrapper.downloadEpisode(animeId, episode, quality);
  await scrapper.closeBrowser();

  res.send({ link: scrappedResults });
});
module.exports = router;