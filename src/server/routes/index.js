const express = require('express');
const router = express.Router();
const Scrapper = require('../services/Scrapper');
let results = {
    popular: [
        {
          title: 'Naruto',
          image: 'https://gogocdn.net/images/anime/N/naruto.jpg',
          link: 'https://gogoanimehd.io/category/naruto'
        },
        {
          title: 'Naruto (Dub)',
          image: 'https://gogocdn.net/cover/naruto-dub.png',
          link: 'https://gogoanimehd.io/category/naruto-dub'
        },
        {
          title: 'Naruto Shippuden',
          image: 'https://gogocdn.net/images/anime/naruto_shippuden.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuden'
        },
        {
          title: 'Naruto Shippuden (Dub)',
          image: 'https://gogocdn.net/cover/naruto-shippuuden-dub.png',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-dub'
        },
        {
          title: 'Naruto (Shinsaku Anime)',
          image: 'https://gogocdn.net/cover/naruto-shinsaku-anime.png',
          link: 'https://gogoanimehd.io/category/naruto-shinsaku-anime'
        },
        {
          title: 'Boruto: Naruto the Movie',
          image: 'https://gogocdn.net/images/upload/175815.jpg',
          link: 'https://gogoanimehd.io/category/boruto-naruto-the-movie'
        },
        {
          title: 'Naruto Shippuden Movie 1',
          image: 'https://gogocdn.net/images/anime/N/Naruto-Shippuuden-Movie-1.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-1'
        },
        {
          title: 'Boruto: Naruto the Movie (Dub)',
          image: 'https://gogocdn.net/cover/boruto-naruto-the-movie-dub.png',
          link: 'https://gogoanimehd.io/category/boruto-naruto-the-movie-dub'
        },
        {
          title: 'Boruto: Naruto Next Generations',
          image: 'https://gogocdn.net/cover/boruto-naruto-next-generations.png',
          link: 'https://gogoanimehd.io/category/boruto-naruto-next-generations'
        },
        {
          title: 'Naruto: Shippuuden Movie 1 (Dub)',
          image: 'https://gogocdn.net/cover/naruto-shippuuden-movie-1-dub.png',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-1-dub'
        },
        {
          title: 'Naruto Shippuden Movie 5 Special',
          image: 'https://gogocdn.net/images/004.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuden-movie-5-special'
        },
        {
          title: 'The Last: Naruto the Movie (Dub)',
          image: 'https://gogocdn.net/cover/the-last-naruto-the-movie-dub.png',
          link: 'https://gogoanimehd.io/category/the-last-naruto-the-movie-dub'
        },
        {
          title: 'Naruto Shippuden Movie 2: Kizuna',
          image: 'https://gogocdn.net/images/anime/N/Naruto-Shippuuden-Movie-2.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-2-kizuna'
        },
        {
          title: 'Naruto Shippuden Movie 7: The Last',
          image: 'https://gogocdn.net/images/upload/67631.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-7-the-last'
        },
        {
          title: 'Naruto Shippuden: Sunny Side Battle',
          image: 'https://gogocdn.net/images/Naruto%20Shippuuden.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-sunny-side-battle'
        },
        {
          title: 'Boruto: Naruto Next Generations (Dub)',
          image: 'https://gogocdn.net/cover/boruto-naruto-next-generations-dub.png',
          link: 'https://gogoanimehd.io/category/boruto-naruto-next-generations-dub'
        },
        {
          title: 'Naruto Shippuden Movie 5: Blood Prison',
          image: 'https://gogocdn.net/images/anime/N/Naruto-Shippuuden-Movie-5.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-5-blood-prison'
        },
        {
          title: 'Naruto Shippuden Movie 6: Road to Ninja',
          image: 'https://gogocdn.net/images/anime/N/Naruto-Shippuuden-Movie-6.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-6-road-to-ninja'
        },
        {
          title: 'Naruto Shippuden Movie 4: The Lost Tower',
          image: 'https://gogocdn.net/images/anime/N/Naruto-Shippuuden-Movie-4.jpg',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-4-the-lost-tower'
        },
        {
          title: 'Naruto: Shippuuden Movie 2 - Kizuna (Dub)',
          image: 'https://gogocdn.net/cover/naruto-shippuuden-movie-2-kizuna-dub.png',
          link: 'https://gogoanimehd.io/category/naruto-shippuuden-movie-2-kizuna-dub'
        }
      ]
    
  }
router.get('/', async (req, res) => {
    res.render('index', { results });

});

module.exports = router;