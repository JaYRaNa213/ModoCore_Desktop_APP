const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    icon: path.join(__dirname, 'assets/app-icon.png'),
    frame: false, // Remove top native window frame (Edit/View/File etc.)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools(); // Optional: open dev tools only in dev
  } else {
    win.loadFile(path.resolve(__dirname, 'dist/index.html')).catch(console.error);

    // Prevent opening devtools in production
    win.webContents.on('devtools-opened', () => {
      win.webContents.closeDevTools();
    });
  }
}

function setupAutoUpdater() {
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'A new version has been downloaded. Restart the app to apply the update.',
      buttons: ['Restart Now', 'Later'],
    }).then(result => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on('checking-for-update', () => {
    console.log('🔄 Checking for update...');
  });

  autoUpdater.on('update-available', () => {
    console.log('⬇️ Update available.');
  });

  autoUpdater.on('update-not-available', () => {
    console.log('✅ No update available.');
  });

  autoUpdater.on('error', (error) => {
    console.error('❌ Auto update error:', error);
  });
}

app.whenReady().then(() => {
  createWindow();
  if (!isDev) setupAutoUpdater();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
