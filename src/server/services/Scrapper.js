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
        return await this.sortAnimeInfo(this.page);
    }
    async getPopular() {
        await this.page.goto(this.url + "popular.html", { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.items li');
        return await this.sortAnimeInfo(this.page);
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
    async sortAnimeInfo(page) {
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
    async getAnimeInfo(animeId) {
        console.log(animeId);
        await this.page.goto(this.url + "/category/" + animeId, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.main_body');
    
        const animeInfo = await this.page.evaluate(() => {
            const descriptions = {};
            [...document.querySelector('.anime_info_body_bg').children].forEach(child => {
                if (child.className != 'type' || child == null) return;
    
                let typeText = child.querySelector('span') ? child.querySelector('span').innerText.trim() : null;
                if (!typeText) return;
    
                let mainText = child.innerText.replace(typeText, '').trim(); // Remove the span text and trim
                typeText = typeText.replace(/:/g, '');
                mainText = child.innerText.replace(/:/g, '');
                
                // Just making sure all unwanted spaced, newlines and tabs are removed
                for (let i = 0; i < typeText.split(' ').length; i++) {
                    mainText = mainText.replace(typeText.split(' ')[i], '');
                }
                while (mainText.charAt(0) === ' ')  mainText = mainText.substr(1);
    
                if (mainText == '') mainText = null;
                descriptions[typeText] = {
                    type: typeText,
                    text: mainText
                };
            });
            const episodeElements = document.querySelectorAll('#episode_related li');
            const episodeIds = [];
            episodeElements.forEach((element) => {
                let link = element.querySelector('a').href.split('/').pop()
                let episodeId = link.split('-episode-')[1];
                episodes = {
                    episodeId: episodeId,
                    link: link,
                };
                episodeIds.push(episodes);
            });
            return {
                title: document.querySelector('.anime_info_body_bg h1').innerText,
                image: document.querySelector('.anime_info_body_bg img').src,
                description: descriptions,
                episodes: episodeIds
            };
        });

        animeInfo.name = animeId;
        return animeInfo;
    }
    
    
}

module.exports = Scrapper;