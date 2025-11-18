// ///preload.js

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   send: (channel, data) => {
//     const validChannels = ["toMain"];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.send(channel, data);
//     }
//   },
//   receive: (channel, callback) => {
//     const validChannels = ["fromMain"];
//     if (validChannels.includes(channel)) {
//       ipcRenderer.on(channel, (event, ...args) => callback(...args));
//     }
//   },

//   // ✅ Add window control APIs
//   closeWindow: () => ipcRenderer.send("close-window"),
//   minimizeWindow: () => ipcRenderer.send("minimize-window"),
//   maximizeWindow: () => ipcRenderer.send("maximize-window"),
// });




// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  /* ---------- Tab Control APIs ---------- */
  createTab: (url) => ipcRenderer.invoke("create-tab", url),
  switchTab: (index) => ipcRenderer.invoke("switch-tab", index),
  closeTab: (index) => ipcRenderer.invoke("close-tab", index),
  reloadTab: (index) => ipcRenderer.invoke("reload-tab", index),
  getTabsState: () => ipcRenderer.invoke("tabs:get-state"),
  onTabsUpdate: (callback) => {
    const listener = (_event, data) => callback?.(data);
    ipcRenderer.on("tabs:update", listener);
    return () => ipcRenderer.removeListener("tabs:update", listener);
  },

  /* ---------- App Launch APIs ---------- */
  launchApps: (apps) => ipcRenderer.invoke("launch-apps", apps),

  /* ---------- Window Control APIs ---------- */
  closeWindow: () => ipcRenderer.send("close-window"),
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),

  /* ---------- Basic send/receive ---------- */
  send: (channel, data) => {
    const validChannels = ["toMain"];
    if (validChannels.includes(channel)) ipcRenderer.send(channel, data);
  },
  receive: (channel, callback) => {
    const validChannels = ["fromMain"];
    if (validChannels.includes(channel))
      ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
});
