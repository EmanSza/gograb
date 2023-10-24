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
    async getEpisode(animeId, episodeId) {
        await this.page.goto(this.url + "/category/" + animeId + "-episode-" + episodeId, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.anime_muti_link');
        const episodeInfo = await this.page.evaluate(() => {
            const episode = {
                title: document.querySelector('.anime_muti_link h4').innerText,
                video: document.querySelector('.anime_muti_link iframe').src,
            };
            return episode;
        });
        return episodeInfo;
    }
    async downloadEpisode(animeId, episodeId, quality) {
        await this.page.goto(this.url + "/category/" + animeId + "-episode-" + episodeId, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.favorites_book');
        // download link is in ul li a
        const downloadLink = await this.page.evaluate(() => {
            const download = document.querySelector('.favorites_book ul li a').href;
            return download;
        });
        // from that link there are a bunch of classes with the name download inthe parent mirror_link that has a parent called content-download. the 1080p link is the one with an a href with the words Download (1080P - mp4)
        await this.page.goto(downloadLink, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.content-download');
        // now that we waited for content-download get the mirror-link and its children
        const downloadLink1080p = await this.page.evaluate(() => {
            const download = document.querySelector('.content-download .mirror_link')
            const downloadLinks = download.querySelectorAll(' .content-download .mirror_link .download');
            let link = null;
            downloadLinks.forEach((element) => {
                if (element.querySelector('a').innerText == `Download (${quality} - mp4)`) {
                    link = element.querySelector('a').href;
                }
            });
        });
        return downloadLink1080p;
    }
    // Now when we download seasons, we just go through each episode and download it
    
}

module.exports = Scrapper;