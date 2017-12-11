//Electron Setup
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipc = electron.ipcMain;
var json = require('json-file');
var fs =  require('fs');

//Create Tasks Menu
app.on('ready', _=>{
    console.log('Browser window is ready....');
    mainWindow = new BrowserWindow({
        icon: __dirname + '/images/icon.png'
        // width: 900,
        // height: 700,
        // resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', _=>{
        console.log('Browser has been closed....');
        mainWindow = null;
    })
});

//Listeners
ipc.on('open-json', (event, path)=>{
    var file = json.read(path);
    var obj = file.get('items');
    mainWindow.webContents.send('obtain-file-content', obj);
});
ipc.on('save-json', (event, list) =>{
    console.log(list);
    var file = `${__dirname}/tasks.json`;
    console.log(file);
    fs.writeFileSync(file, JSON.stringify(list));
});