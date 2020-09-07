const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

const readFileBtn = document.getElementById("read-file");

readFileBtn.addEventListener("click", (e) => {
  ipcRenderer.send("btn-read-file-clicked");
});

ipcRenderer.on("file-read", (event, data) => {
  document.getElementById("read-file-content").innerHTML = data;
});
