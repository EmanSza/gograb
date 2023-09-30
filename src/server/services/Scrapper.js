const puppeteer = require('puppeteer');
const nodeCache = require('node-cache');
const myCache = new nodeCache();

class Scrapper {
    constructor() {
        this.puppeteer = puppeteer;

        this.browser = null;
        this.page = null;
        this.url = "https://gogoanimehd.io/"
        this.baseUrl = "https://gogoanimehd.io/"
        this.myCache = myCache;
    }
    async startBrowser() {
        this.browser = await this.puppeteer.launch({ 
            headless: true,
         });
        this.page = await this.browser.newPage();
    }
    async closeBrowser() {
        await this.browser.close();
    }
    async getAnime(name) {
        await this.page.goto(this.url + "search.html?keyword=" + name + "&sort=title_az", { waitUntil: 'domcontentloaded' });
    
        console.log("Page loaded.");
    
        // Wait for all the "li" elements inside ".items" class
        await this.page.waitForSelector('.items li');
    
        const animeList = await this.page.evaluate(() => {
            console.log('inside evaluate');
            const list = [];
            const elements = document.querySelectorAll('.items li');
            console.log(elements);
            for (const element of elements) {
                let anime = {
                    // Title is in the p tag in the a tag
                    title: element.querySelector('.name a').innerText,
                    // Image is in the img tag that has an "a" child with the img inside
                    image: element.querySelector('.img a img').src,
                    // Link
                    link: element.querySelector('.name a').href,
                };
                list.push(anime);
            }

            return list;
        });
        console.log('animeList', animeList);
        return animeList;
    }

}

module.exports = Scrapper;