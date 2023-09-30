const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');

router.get('/', async (req, res) => {
    const scrapper = new Scrapper();

    await scrapper.startBrowser();

    let results = await scrapper.getAnime('naruto');

    // send results to the client
    res.render('index', { results });

    await scrapper.closeBrowser();
});

module.exports = router;