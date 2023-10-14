const routeDir = (app) => {
    app.use('/', require('../routes/index.js'));
    app.use('/api', require('../routes/api/index.js'));
    app.use('/anime', require('../routes/anime.js'));
}

module.exports = routeDir;