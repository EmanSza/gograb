const express = require('express');
const router = express.Router();
const Scrapper = require('../../services/Scrapper');


router.get('/', async (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

router.get('/search', async (req, res) => {
    const searchTerm = req.query.search; 

    if(searchTerm) {
        let results = {};
        const scrapper = new Scrapper();
        await scrapper.startBrowser();
    
        let scrappedResults = await scrapper.getAnime(searchTerm);
    
        await scrapper.closeBrowser();
    
        results.search = scrappedResults;
    
        res.render('search', { results });  
    }
});
router.post('/search', async (req, res) => {
    const search = req.body.input;

    const scrapper = new Scrapper();

    await scrapper.startBrowser();

    let scrappedResults = await scrapper.getAnime(search);


    console.log(scrappedResults)

    await scrapper.closeBrowser();
    if (scrappedResults === null) {
        scrappedResults = [];
    }
    res.json({
        scrappedResults
    });
})
module.exports = router;