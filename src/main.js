const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Comprobar actualizaciones al iniciar la aplicación
app.on('ready', () => {
  // Configurar el servidor de actualización
  const { autoUpdater } = require('electron-updater');
  
  autoUpdater.setFeedURL({
    url: 'https://github.com/miguel-gl/guia/releases',
    provider: 'github',
    owner: 'miguel-gl',
    repo: 'guia',
    releaseType: 'release'
  });

  // Manejar eventos de actualización
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

  // Escuchar mensajes de actualización desde el proceso de renderizado
  ipcMain.on('download-update', () => {
    autoUpdater.downloadUpdate();
  });

  ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
  });

  // Comprobar actualizaciones
  autoUpdater.checkForUpdates();
});
