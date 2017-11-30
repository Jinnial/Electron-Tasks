//Electron Setup
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;

//Create Tasks Menu
app.on('ready', _=>{
    console.log('Browser window is ready....');
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', _=>{
        console.log('Browser has been closed....');
        mainWindow = null;
    })
});