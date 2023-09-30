const {app, BrowserWindow} = require('electron');
const path = require('path');

const express = require('express');
const flash = require('express-flash');
const exapp = express();

exapp.use(express.static(__dirname + '../client/public'));
exapp.set('views', __dirname + '../client/pages');
exapp.set('view engine', 'ejs');
exapp.use(express.urlencoded({ extended: true }));
exapp.use(express.json());
exapp.use(flash());

const server = exapp.listen(3000, () => {
    console.log('Server listening on port 3000');
});

const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, '../utility/preload.js')
    }
});

mainWindow.loadURL('http://localhost:3000');

app.on('window-all-closed', () => {
    server.close();
    app.quit();
});

// Path: src/server/utility/preload.js

