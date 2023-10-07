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
  
  res.render('search', { results });  
  
});

module.exports = router;