const routeDir = (app) => {
    app.use('/', require('../routes/index.js'));
    app.use('/api', require('../routes/api/index.js'));
}

module.exports = routeDir;