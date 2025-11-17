// // electron.cjs
// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");

// const isDev = !app.isPackaged;
// let win;

// // ✅ Disable noisy security warnings in development
// if (isDev) process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";

// function createWindow() {
//   win = new BrowserWindow({
//     width: 1280,
//     height: 800,
//     : path.join(__dirname, "public", "icon.ico"),icon
//     autoHideMenuBar: true,
//     backgroundColor: "#1e1e1e",
//     webPreferences: {
//       preload: path.join(__dirname, "preload.js"),
//       nodeIntegration: false, // ✅ keeps app secure
//       contextIsolation: true, // ✅ isolates preload safely
//     },
//   });

//   // ✅ Load app depending on environment
//   if (isDev) {
//     win.loadURL("http://localhost:5173");
//   } else {
//     win.loadFile(path.join(__dirname, "dist", "index.html"));
//   }

//   // ✅ Toggle DevTools with Ctrl+Shift+I (or Cmd+Opt+I on macOS)
//   win.webContents.on("before-input-event", (event, input) => {
//     const isToggleShortcut =
//       (input.control || input.meta) && input.shift && input.key.toLowerCase() === "i";
//     if (isToggleShortcut) {
//       if (win.webContents.isDevToolsOpened()) {
//         win.webContents.closeDevTools();
//       } else {
//         win.webContents.openDevTools({ mode: "detach" });
//       }
//     }
//   });

//   // ✅ Prevent annoying autofill console spam
//   win.webContents.on("console-message", (event, level, message) => {
//     if (message.includes("Autofill")) {
//       event.preventDefault();
//     }
//   });

//   // ✅ Apply a strong Content Security Policy (CSP) in production
//   if (!isDev) {
//     win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//       callback({
//         responseHeaders: {
//           ...details.responseHeaders,
//           "Content-Security-Policy": [
//             "default-src 'self'; " +
//               "script-src 'self'; " +
//               "style-src 'self' 'unsafe-inline'; " +
//               "img-src 'self' data: https://contextswap-backend.onrender.com; " +
//               "connect-src 'self' https://contextswap-backend.onrender.com; " +
//               "font-src 'self' data:; " +
//               "object-src 'none'; frame-ancestors 'none';"
//           ],
//         },
//       });
//     });
//   }
// }

// /* ---------------- IPC Window Controls ---------------- */
// ipcMain.on("close-window", () => {
//   const currentWindow = BrowserWindow.getFocusedWindow();
//   if (currentWindow) currentWindow.close();
// });

// ipcMain.on("minimize-window", () => {
//   const currentWindow = BrowserWindow.getFocusedWindow();
//   if (currentWindow) currentWindow.minimize();
// });

// ipcMain.on("maximize-window", () => {
//   const currentWindow = BrowserWindow.getFocusedWindow();
//   if (currentWindow) {
//     currentWindow.isMaximized() ? currentWindow.unmaximize() : currentWindow.maximize();
//   }
// });

// /* ---------------- App Lifecycle ---------------- */
// app.whenReady().then(createWindow);

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });

// app.on("activate", () => {
//   if (BrowserWindow.getAllWindows().length === 0) createWindow();
// });



// electron.cjs
const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;
let win;
let tabs = [];
let activeTabIndex = -1;

// ✅ Disable noisy security warnings in development
if (isDev) process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 800,
   icon: path.join(process.resourcesPath, "icons", "icon.ico"),

    autoHideMenuBar: true,
    backgroundColor: "#1e1e1e",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  //  Try to load Vite (for dev)
  const devUrl = "http://localhost:5173";
  win
    .loadURL(devUrl)
    .catch(() => {
      console.log("⚠️ Dev server not running. Loading production build...");
      win.loadFile(path.join(__dirname, "dist", "index.html"));
    });

  // ✅ Optional DevTools toggle
  win.webContents.on("before-input-event", (event, input) => {
    if ((input.control || input.meta) && input.shift && input.key.toLowerCase() === "i") {
      win.webContents.isDevToolsOpened()
        ? win.webContents.closeDevTools()
        : win.webContents.openDevTools({ mode: "detach" });
    }
  });

  // ✅ Suppress Autofill spam
  win.webContents.on("console-message", (event, level, message) => {
    if (message.includes("Autofill")) event.preventDefault();
  });

  // ✅ CSP for production
  if (!isDev) {
    win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "default-src 'self'; " +
              "script-src 'self'; " +
              "style-src 'self' 'unsafe-inline'; " +
              "img-src 'self' data: https://contextswap-backend.onrender.com; " +
              "connect-src 'self' https://contextswap-backend.onrender.com; " +
              "font-src 'self' data:; " +
              "object-src 'none'; frame-ancestors 'none';",
          ],
        },
      });
    });
  }
}

/* ---------------- IPC Window Controls ---------------- */
ipcMain.on("close-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) currentWindow.close();
});

ipcMain.on("minimize-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) currentWindow.minimize();
});

ipcMain.on("maximize-window", () => {
  const currentWindow = BrowserWindow.getFocusedWindow();
  if (currentWindow) {
    currentWindow.isMaximized()
      ? currentWindow.unmaximize()
      : currentWindow.maximize();
  }
});

/* ---------------- TAB MANAGEMENT ---------------- */
// --- TAB MANAGEMENT (updated for Chrome-like layout) ---
ipcMain.handle("create-tab", (event, url) => {
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.addBrowserView(view);
  const [width, height] = win.getContentSize();

  // Reserve top 120px (approx) for React Header + Tabs bar
  view.setBounds({ x: 0, y: 120, width, height: height - 120 });
  view.setAutoResize({ width: true, height: true });
  view.webContents.loadURL(url);

  tabs.push(view);
  activeTabIndex = tabs.length - 1;

  // Keep only one view visible
  tabs.forEach((t, i) => {
    if (i === activeTabIndex) {
      win.setBrowserView(t);
    } else {
      win.removeBrowserView(t);
    }
  });
});

ipcMain.handle("switch-tab", (event, index) => {
  if (tabs[index]) {
    tabs.forEach((t, i) => {
      if (i === index) {
        win.addBrowserView(t);
        const [width, height] = win.getContentSize();
        t.setBounds({ x: 0, y: 120, width, height: height - 120 });
      } else {
        win.removeBrowserView(t);
      }
    });
    activeTabIndex = index;
  }
});

ipcMain.handle("close-tab", (event, index) => {
  if (tabs[index]) {
    win.removeBrowserView(tabs[index]);
    tabs[index].destroy();
    tabs.splice(index, 1);
    if (tabs.length > 0) {
      activeTabIndex = Math.max(0, index - 1);
      win.addBrowserView(tabs[activeTabIndex]);
    } else {
      activeTabIndex = -1;
    }
  }
});

ipcMain.handle("reload-tab", (event, index) => {
  if (tabs[index]) tabs[index].webContents.reload();
});

/* ---------------- App Lifecycle ---------------- */
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
