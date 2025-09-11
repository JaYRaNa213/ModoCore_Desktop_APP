const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

const isDev = !app.isPackaged;

let win; // Store globally to access in updater, etc.


const { protocol } = require("electron");
function registerAppProtocol() {
  protocol.registerFileProtocol("app", (request, callback) => {
    try {
      let url = request.url.replace("app://", "");
      if (!url || url === "/" || url.startsWith("?")) {
        url = "index.html";
      }

      // ✅ Always resolve from frontend/dist
      const filePath = path.join(__dirname, "frontend", "dist", url);

      console.log("📂 Resolving:", request.url, "->", filePath);
      callback({ path: filePath });
    } catch (error) {
      console.error("❌ Failed to load app:// resource:", error);
    }
  });
}


function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: isDev
      ? path.join(__dirname, "public", "icon.ico")
      : path.join(process.resourcesPath, "icon.ico"),
    frame: true, 
    autoHideMenuBar: true, 
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

   win.setMenu(null);
if (isDev) {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  win.loadURL("http://localhost:5173");
  win.webContents.openDevTools();
} else {
  win.loadURL("app://index.html");
}


win.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
  console.error("❌ Page failed to load:", validatedURL, errorCode, errorDescription);
});



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
app.whenReady().then(() => {
  if (!isDev) registerAppProtocol();
  createWindow();
  if (!isDev) setupAutoUpdater();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
