const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

const isDev = !app.isPackaged;

let win; // Store globally to access in updater, etc.

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: isDev
      ? path.join(__dirname, "public", "icon.ico")
      : path.join(process.resourcesPath, "icon.ico"),
    frame: true, 
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // Dev only
  } else {
    win.loadFile(path.join(__dirname, "dist", "index.html")).catch(console.error);

    win.webContents.on("devtools-opened", () => {
      win.webContents.closeDevTools(); // Prevent devtools in prod
    });
  }
}

// ✅ IPC listeners (define once globally)
ipcMain.on("close-window", () => {
  BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.on("minimize-window", () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("maximize-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
  }
});

// ✅ Auto-updater logic (production only)
function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-downloaded", () => {
    dialog.showMessageBox({
      type: "info",
      title: "Update Ready",
      message: "A new version has been downloaded. Restart the app to apply the update.",
      buttons: ["Restart Now", "Later"],
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on("checking-for-update", () => console.log("🔄 Checking for update..."));
  autoUpdater.on("update-available", () => console.log("⬇️ Update available."));
  autoUpdater.on("update-not-available", () => console.log("✅ No update available."));
  autoUpdater.on("error", (error) => console.error("❌ Auto update error:", error));
}

// ✅ App lifecycle
app.whenReady().then(() => {
  createWindow();
  if (!isDev) setupAutoUpdater();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
