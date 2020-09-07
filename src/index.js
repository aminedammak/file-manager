const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const { ipcMain } = require("electron/main");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //handle read file click event
  ipcMain.on("btn-read-file-clicked", (event, data) => {
    readFile();
  });

  const initialisation = () => {
    //at first create files to be manipulated
    fs.writeFile("files/file1.txt", "Content of the file 1", function (err) {
      if (err) throw err;
      console.log("file1 created");
    });
    fs.writeFile("files/file2.txt", "Content of the file 2", function (err) {
      if (err) throw err;
      console.log("file2 created");
    });
  };

  initialisation();
  const readFile = () => {
    const files = dialog.showOpenDialogSync(mainWindow, {
      properties: ["openFile"],
      filters: [
        {
          name: "Markdown",
          extensions: ["md", "markdown", "txt"],
        },
      ],
    });

    if (!files) return;

    const file = files[0];
    const fileContent = fs.readFileSync(file).toString();
    mainWindow.webContents.send("file-read", fileContent);
  };
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
