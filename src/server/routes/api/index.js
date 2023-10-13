const express = require('express');
const router = express.Router();
const Scrapper = require('../../services/Scrapper');


router.get('/', async (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

router.post('/search', async (req, res) => {
    const search = req.body.input;
    console.log(search);
    const scrapper = new Scrapper();

    await scrapper.startBrowser();

    let scrappedResults = await scrapper.getAnime(search);

    await scrapper.closeBrowser();
    if (scrappedResults === null) {
        scrappedResults = [];
    }
    res.json({
        scrappedResults
    });
})
module.exports = router;