const puppeteer = require('puppeteer');
const nodeCache = require('node-cache');
class Scrapper {
    constructor() {
        this.puppeteer = puppeteer;

        this.browser = null;
        this.page = null;
        this.url = "https://gogoanimehd.io/"
    }
    async startBrowser() {
        this.browser = await this.puppeteer.launch({ 
            headless: 'new',
         });
        this.page = await this.browser.newPage();
    }
    async closeBrowser() {
        await this.browser.close();
    }
    async getAnime(name) {
        await this.page.goto(this.url + "search.html?keyword=" + name + "&sort=title_az", { waitUntil: 'domcontentloaded' });

        const hasElements = await this.page.$('.items li');

        if (hasElements === null) {
          return []; // Return an empty list if no elements are found
        }

        await this.page.waitForSelector('.items li');
        return await this.getAnimeInfo(this.page);
    }
    async getPopular() {
        await this.page.goto(this.url + "popular.html", { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.items li');
        return await this.getAnimeInfo(this.page);
    }
    async getRecent() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.items li');
        const animeList = await this.page.evaluate(() => {
            const list = [];
            const elements = document.querySelectorAll('.items li');
            for (const element of elements) {
                let anime = {
                    title: element.querySelector('.name a').innerText,
                    image: element.querySelector('.img a img').src,
                    link: element.querySelector('.name a').href,
                    webLink: "anime/" + element.querySelector('.name a').href.split('/').pop().split('-episode-')[0],
                };
                list.push(anime);
            }
            return list;
        });
        return animeList;
    }
    async getAnimeInfo(page) {
        return page.evaluate(() => {
            const list = [];
            const elements = document.querySelectorAll('.items li');
            for (const element of elements) {
                let anime = {
                    title: element.querySelector('.name a').innerText,
                    image: element.querySelector('.img a img').src,
                    link: element.querySelector('.name a').href,
                    webLink: "anime/" + element.querySelector('.name a').href.split('/category/')[1],
                };
                list.push(anime);
            }
            return list;
        });
    }
}

module.exports = Scrapper;