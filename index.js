const { app, BrowserWindow, Menu } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

Menu.setApplicationMenu(null);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // if config file not found, open setup page
    if (!fs.existsSync(path.join(__dirname, '/keys/config.json')))
        win.loadFile('pages/setup.html');
};

app.whenReady().then(() => {
    createWindow();
    // activate window for macOS/darwin
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});