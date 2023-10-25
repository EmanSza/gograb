const {app, BrowserWindow} = require('electron');
const path = require('path');
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');
const { session } = require('electron');

ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
  blocker.enableBlockingInSession(session.defaultSession);
});

const startElectron = () => {
    function createWindow () {
        const win = new BrowserWindow({
          width: 780,
          height: 768,
          minWidth: 780,
          minHeight: 768,
          webPreferences: {
            preload: path.join(__dirname, 'preload.js')
          }
        })
    
        win.loadURL('http://localhost:3000/loading')

        win.webContents.on('new-window', (event, url) => {
          event.preventDefault(); // Prevent the default behavior (open in default browser)
          const newWindow = new BrowserWindow({ width: 800, height: 600 });
          newWindow.loadURL(url);
        });
    }
    
    
    
    app.whenReady().then(() => {
      createWindow()
    
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
      })
    })
    
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    // If the app gets any errors close the app
    app.on('error', () => {
      app.quit()
      process.exit()
    })
}

module.exports = startElectron;