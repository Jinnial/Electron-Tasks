//Electron
const electron = require('electron');
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
const ipc = electron.ipcRenderer;

//Load Modals
$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    loadData(__dirname + '/tasks.json');
});

//Vue.js
var app = new Vue({
    el: "#app",
    data: {
        //Name, Completed
        tasks: {
            items: []
        }
    },
    methods: {
        addItem() {
            var taskEntry = $("#taskEntry")[0].value;
            this.tasks.items.push({ name: taskEntry, completed: false, id: this.tasks.items.length });
            updateView();
        },
        removeItem(pos) {
            this.tasks.items[pos].completed = true;
            updateView();
        },
        newList() {
            this.tasks = { "items": [] };
            ipc.send('save-json', { "items": [] });
            updateView();
        }
    }
});

//Navigation Buttons
document.getElementById("openFileSubmit").addEventListener('click', _ => {
    var path = $('#fileInput')[0].files[0].path;
    loadData(path);
});

document.getElementById('saveFileSubmit').addEventListener('click', _ => {
    dialog.showSaveDialog({ filters: [ { name: 'Task List (.json)', extensions: ['json'] } ] }, function (fileName) {
        console.log(fileName);
        ipc.send('save-json', [app.tasks, fileName]);
    }); 
})

//Recieve Array of Objects 
ipc.on('obtain-file-content', (event, args) => {
    console.log(args);
    app.tasks.items = args;
    updateView();
});

function loadData(path) {
    ipc.send('open-json', path);
}

//Menu Bar
ipc.on('menu-open', (event, args) => {
    $('#openFile').modal('open');
});

ipc.on('menu-add', (event, args) => {
    $('#addItem').modal('open');
});

ipc.on('menu-clear', (event, args) => {
    app.tasks.items = [];
    updateView();
});

//Update Form
function updateView() {
    var empty = true;
    app.tasks.items.forEach(function (item) {
        if (item.completed == false) {
            empty = false;
        }
    }, this);
    if (empty == true) {
        $('#tasks').hide()
    }
    else {
        $('#tasks').show()
    }
}