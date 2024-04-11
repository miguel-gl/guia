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