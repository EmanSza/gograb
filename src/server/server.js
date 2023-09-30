const express = require('express');
const flash = require('express-flash');

app.use(express.static(__dirname + '../client/public'));
app.set('views', __dirname + '../client/pages');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());


module.exports = app;