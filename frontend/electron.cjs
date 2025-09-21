const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
let win;

// Disable security warnings in development (optional)
if (isDev) process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, "public", "icon.png"),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,   // ✅ keeps your app safe
      contextIsolation: true,   // ✅ keeps your app safe
    },
  });

  if (isDev) {
    // Vite dev server
    win.loadURL("http://localhost:5173");
  } else {
    // Production build
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  // DevTools shortcut (Ctrl+Shift+I)
  win.webContents.on("before-input-event", (event, input) => {
    if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === "i") {
      win.webContents.isDevToolsOpened()
        ? win.webContents.closeDevTools()
        : win.webContents.openDevTools({ mode: "detach" });
    }
  });

  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
  if (message.includes("Autofill")) {
    event.preventDefault(); // ignore Autofill errors
  }
});


  // Add a strict Content Security Policy in production
  if (!isDev) {
    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": ["default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:"]
        }
      });
    });
  }
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
