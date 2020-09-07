const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const readFileBtn = document.getElementById("read-file");
const deleteFileBtn = document.getElementById("delete-file");

readFileBtn.addEventListener("click", (e) => {
  ipcRenderer.send("btn-read-file-clicked");
});

deleteFileBtn.addEventListener("click", (e) => {
  ipcRenderer.send("btn-delete-file-clicked");
});

ipcRenderer.on("file-read", (event, data) => {
  document.getElementById("read-file-content").innerHTML = data;
});
