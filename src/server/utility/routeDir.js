const routeDir = (app) => {
    app.use('/', require('../routes/index.js'));
}

module.exports = routeDir;