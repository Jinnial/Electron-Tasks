//Electron
const electron = require('electron');
var app = require('electron').remote;
var dialog = app.dialog;
var fs =  require('fs');
const ipc = electron.ipcRenderer;

//Load Modals

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

//Methods
function addItem(){
    alert('Adding item....');
}
