const axios = require('axios');
const fs = require('fs');
const path = require('path');

const btnCambiarImagen = document.getElementById('btnCambiarImagen');
const imagenMostrada = document.getElementById('imagenMostrada');

btnCambiarImagen.addEventListener('click', async () => {
  try {
    const response = await axios.get('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp-J34BiHg2acOXDDeIQtgsPUGSpn1P9v4DWyZ_mqPLw&s', {
      responseType: 'arraybuffer'
    });

    const imagePath = path.join(__dirname, 'imagenDescargada.jpg');
    fs.writeFileSync(imagePath, Buffer.from(response.data));

    imagenMostrada.src = `imagenDescargada.jpg`;
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
  }
});

// Cuando se recibe el mensaje de que hay una actualización disponible
ipcRenderer.on('update-available', () => {
  const updateAvailableDiv = document.getElementById('update-available');
  updateAvailableDiv.style.display = 'block'; // Mostrar el mensaje
  
  // Cuando se hace clic en "Descargar"
  const downloadButton = document.getElementById('download-update');
  downloadButton.addEventListener('click', () => {
    ipcRenderer.send('download-update');
    downloadButton.innerText = 'Descargando...';
    downloadButton.disabled = true;
  });
  
  // Cuando se hace clic en "Instalar"
  const installButton = document.getElementById('install-update');
  installButton.addEventListener('click', () => {
    ipcRenderer.send('install-update');
  });
});

// Cuando se recibe el mensaje de que la actualización está descargada
ipcRenderer.on('update-downloaded', () => {
  const installButton = document.getElementById('install-update');
  installButton.style.display = 'inline-block'; // Mostrar el botón de instalar
});