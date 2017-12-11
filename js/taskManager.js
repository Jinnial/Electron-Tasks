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

//Vue.js
var app = new Vue({
    el: "#app",
    data: {
        //Name, Completed
        items: [
            {name: "Complete Final Project", completed: false}
        ]
    },
    methods: {
        addItem(task){
            this.items.push({name: task, completed: false})
        },
        removeItem(){
            alert('Removing Item....')
        }
    }
});