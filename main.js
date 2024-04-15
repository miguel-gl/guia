const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const request = require('request');
const https = require('https');
const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs-extra');


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
            contextIsolation: false,
    },
  })
  win.setMenu(null);
  win.loadFile('src/vews/index.html');
  win.maximize();
  //win.webContents.openDevTools()
}
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

ipcMain.on('peticion', (event, nombre,telefono,s1,s2,s3,s4) => {
  request('http://sistemasaudiovisualesinternacionales.net/API/controller/controller.php?funcion=vali_date&propietario='+nombre+'&telefono='+telefono+'&serial1='+s1+'&serial2='+s2+'&serial3='+s3+'&serial4='+s4, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    event.returnValue = body.response;
    }); 
});

ipcMain.on('update', (event,version) => {
  checkUpdates(version)
  .then(update => {
   
        update = update[0];
        if (update.status == 200) {
        const file = fs.createWriteStream(path.join(__dirname, "update.zip"));
        https.get(update.url_descarga, response => {
          response.pipe(file);
          file.on('finish', () => {
              file.close();
              console.log('File downloaded');
              event.returnValue = 200;
          });
      });
    }
    else{
      event.returnValue = 404;
    }
  })
  .catch(error => {
    console.error('Error al obtener actualización:', error);
    event.returnValue = 404; // Indicar un error al cliente
  });
});
async function checkUpdates(version) {
  const url = 'https://sistemasaudiovisualesinternacionales.com/gestor/controller/controller.php';
  const parametros = {
    'funcion': 'getUpdates',
    'version': version
  };
  try {
    const response = await axios.post(url, parametros, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta del servidor:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hubo un error:', error);
    return 404;
  }
  }
  ipcMain.on('reUpdate', (event, version) => {
    const extract = require('extract-zip');
    const { exec } = require('child_process');
  
    const updateZipPath = path.join(__dirname, "update.zip");
    const extractDir = path.join(__dirname, "update");
  
    extract(updateZipPath, { dir: extractDir }, function (err) {
      if (err) {
        console.log('Error al descomprimir:', err);
        event.returnValue = 404;
      } else {
        console.log('Extracción completada');
        const srcVewsPath = path.join(__dirname, "src", "vews");
  
        exec(`PowerShell -Command "Copy-Item -Path '${path.join(extractDir, "*")}' -Destination '${srcVewsPath}' -Recurse -Force"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error al reemplazar archivos: ${error}`);
            event.returnValue = 500;
          } else {
            console.log(`Archivos y carpetas reemplazados: ${stdout}`);
            event.returnValue = 200;
            fs.unlink(updateZipPath, (err) => {
              if (err) {
                console.error('Error al eliminar update.zip:', err);
              } else {
                console.log('update.zip eliminado correctamente');
              }
            });
  
            fs.remove(extractDir, (err) => {
              if (err) {
                console.error('Error al eliminar la carpeta temporal update:', err);
              } else {
                console.log('Carpeta temporal update eliminada correctamente');
              }
            });
          }
        });
      }
    });
  });