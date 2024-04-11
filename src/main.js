const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        enableRemoteModule: true
    }
  });

  win.loadFile('src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'miguel-gl',
  repo: 'guia',
  releaseType: 'release'
});

// Escuchar eventos de actualización
autoUpdater.on('checking-for-update', () => {
  console.log('Buscando actualizaciones...');
});
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-available');
});
autoUpdater.on('update-not-available', () => {
  console.log('No hay actualizaciones disponibles.');
});
autoUpdater.on('update-downloaded', () => {
  console.log('Actualización descargada, se instalará al reiniciar la aplicación.');
  mainWindow.webContents.send('update-downloaded');
});

// Cuando se recibe el mensaje de "Descargar"
ipcMain.on('download-update', () => {
  autoUpdater.downloadUpdate();
});

// Cuando se recibe el mensaje de "Instalar"
ipcMain.on('install-update', () => {
  autoUpdater.quitAndInstall();
});

app.on('ready', () => {
  autoUpdater.checkForUpdates();
});