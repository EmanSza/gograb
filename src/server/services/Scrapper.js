const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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
        await this.page.goto(this.url + animeId + "-episode-" + episodeId, { waitUntil: 'domcontentloaded' });
        await this.page.waitForSelector('.anime_video_body');
        const episodeInfo = await this.page.evaluate(() => {
            const episode = {
                name: document.querySelector('.anime-info a').innerText,
                video: document.querySelector('.play-video iframe').src,
                autoplay: false,
            };
            return episode;
        });
        episodeInfo.episode_id = episodeId;
        episodeInfo.current_episode = {
            episode_link: `/anime/${animeId}/episode/${episodeId}`,
            episode_id: episodeId,
            animeId: animeId,
        }
        // if the number of episodes is greater than the current episode, then there is a next episode
        if (parseInt(episodeId) + 1 <= parseInt(episodeInfo.episodes)) {
            episodeInfo.next_episode = {
                episode_link: `/anime/${animeId}/episode/${parseInt(episodeId) + 1}`,
                episode_id: parseInt(episodeId) + 1,
                animeId: animeId,
            }
        } else {
            // have next episode be the anime page
            episodeInfo.next_episode = {
                episode_link: `/anime/${animeId}`,
                episode_id: null,
                animeId: animeId,
            }
        }
        return episodeInfo;
    }
    async downloadEpisode(animeId, episodeId, quality) {
        try {
            await this.page.goto(this.url + "/category/" + animeId + "-episode-" + episodeId, { waitUntil: 'domcontentloaded' });
            await this.page.waitForSelector('.favorites_book');

            const downloadLink = await this.page.evaluate(() => {
                return document.querySelector('.favorites_book ul li a').href;
            });

            await this.page.goto(downloadLink, { waitUntil: 'domcontentloaded' });
            await this.page.waitForSelector('.content-download');

            const downloadLink1080p = await this.page.evaluate((quality) => {
                const download = document.querySelector('.content-download .mirror_link');
                const downloadLinks = download.querySelectorAll('.download');
                let link = null;
                downloadLinks.forEach((element) => {
                    if (element.querySelector('a').innerText.includes(`Download (${quality} - mp4)`)) {
                        link = element.querySelector('a').href;
                    }
                });
                return link;
            }, quality);

            if (!downloadLink1080p) {
                throw new Error("Quality not found");
            }

            // Download the episode
            await this.download(downloadLink1080p, animeId, episodeId);

        } catch (error) {
            console.error(`Error downloading episode: ${error}`);
        }
    }
    // Now when we download seasons, we just go through each episode and download it
        async download(url, animeId, episodeId) {
        const downloadDir = path.join(__dirname, 'downloads', animeId);

        // Check if folder exists, if not create one
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }

        const filePath = path.join(downloadDir, `${animeId}-${episodeId}.mp4`);

        const writer = fs.createWriteStream(filePath);

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
}

module.exports = Scrapper;