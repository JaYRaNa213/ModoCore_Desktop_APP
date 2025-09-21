const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "public", "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
  win.loadURL("http://localhost:5173");
} else {
  win.loadFile(path.join(__dirname, "dist", "index.html"));
}


  // DevTools shortcut (Ctrl+Shift+I)
  win.webContents.on("before-input-event", (event, input) => {
    if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === "i") {
      win.webContents.isDevToolsOpened() ? win.webContents.closeDevTools() : win.webContents.openDevTools({ mode: "detach" });
    }
  });
}

// IPC window controls
ipcMain.on("close-window", () => BrowserWindow.getFocusedWindow()?.close());
ipcMain.on("minimize-window", () => BrowserWindow.getFocusedWindow()?.minimize());
ipcMain.on("maximize-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
});

// App lifecycle
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
