const express = require('express');
const path = require('path');
const routeDir = require('./utility/routeDir')

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')))
app.set('views', path.join(__dirname, '../client/pages'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routeDir(app);


module.exports = app;