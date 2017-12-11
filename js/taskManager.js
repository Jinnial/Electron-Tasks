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
        tasks:{
            items: [
                {name: "Complete Final Project", completed: false, id: 0}
            ]
        }
    },
    methods: {
        addItem(){
            var taskEntry = $("#taskEntry")[0].value;
            this.tasks.items.push({name: taskEntry, completed: false, id: this.tasks.items.length});
            updateView();
        },
        removeItem(pos){
            this.tasks.items[pos].completed = true;
            updateView();
        },
        newList(){
            this.tasks = { "items": [] };
            ipc.send('save-json', { "items": [] });
            updateView();
        }
    }
});

//Navigation Buttons
document.getElementById("openFileSubmit").addEventListener('click', _=>{
    var path = $('#fileInput')[0].files[0].path;
    ipc.send('open-json', path);
});

document.getElementById('saveFileSubmit').addEventListener('click', _=>{
    ipc.send('save-json', app.tasks);
})

//Recieve Array of Objects 
ipc.on('obtain-file-content', (event, args) =>{
    app.tasks.items = args;
    updateView();
});

//Update Form
function updateView(){
    var empty = true;
    app.tasks.items.forEach(function(item) {
        if (item.completed == false){
            empty = false;
        }
    }, this);
    if(empty == true){
        $('#tasks').hide()
    }
    else{
        $('#tasks').show()
    }
}