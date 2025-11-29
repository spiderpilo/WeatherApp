const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    const url = 'http://localhost:5199';
    console.log('[main] dev mode:', isDev, 'loading:', url);
    win.loadURL(url);
   //win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  win.webContents.on('did-finish-load', () => {
    console.log('[main] renderer finished load');
  });
  win.webContents.on('did-fail-load', (e, code, desc, url) => {
    console.error('[main] did-fail-load', code, desc, url);
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
