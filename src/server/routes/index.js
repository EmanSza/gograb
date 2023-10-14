const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');

router.get('/loading', async (req, res) => {
    res.render('loading');
});
router.get('/', async (req, res) => {
    results = {};
    const scrapper = new Scrapper();
    await scrapper.startBrowser();

    let scrappedResults = await scrapper.getPopular();

    await scrapper.closeBrowser();

    // Put the results in an object called popular
    results.popular = scrappedResults;
    

    await scrapper.startBrowser();

    // sleep for 2 seconds
    await new Promise(r => setTimeout(r, 750));

    scrappedResults = await scrapper.getRecent();

    await scrapper.closeBrowser();

    // Put the results in an object called recent
    results.recent = scrappedResults;
  
    res.render('index', { results });

});

router.get('/search', async (req, res) => {
  const searchTerm = req.query.search; 
  // if its empty send a empty object
  if (!searchTerm) {
    return res.render('search', { scrappedResults: false });
  }
  const scrapper = new Scrapper();
  await scrapper.startBrowser();

  let scrappedResults = await scrapper.getAnime(searchTerm);

  await scrapper.closeBrowser();
  if (scrappedResults === null) {
    return res.render('search', { scrappedResults: false });
  }

  res.render('search', { scrappedResults });  
  
});

module.exports = router;