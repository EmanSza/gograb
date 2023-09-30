const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')))
app.set('views', path.join(__dirname, '../client/pages'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({secret: "thisdoesntmatter"}));
app.use(flash());

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;