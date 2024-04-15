//JavaScript
const { ipcRenderer } = require('electron');
const Swal = require('sweetalert2');
const form = document.getElementById('form_login');

form.addEventListener('submit', e =>
{
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const s1 = document.getElementById('serie_1').value;
    const s2 = document.getElementById('serie_2').value;
    const s3 = document.getElementById('serie_3').value;
    const s4 = document.getElementById('serie_4').value;

    var validata=ipcRenderer.sendSync('peticion',nombre,telefono,s1,s2,s3,s4);
  
    if(validata==100)
    {
        localStorage.setItem("g2r7t48rt24","fe864f1e468r");
        Swal.fire({
            title: 'Correcto',
            text: "Tu Licencia ha sido activada con éxito",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        }).then((result) => {
            document.location.href = "perfil.html";
        })  
    }
    if(validata==404)
    {
        Swal.fire({
            title: 'Incorrecto',
            text: "La licencia introducida no es valida, intenta nuevamente",
            icon: 'info',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        })  
    }
    if(validata==304)
    {
        Swal.fire({
            title: 'Licencia en Uso',
            text: "La Licencia introducida ya esta en uso (Enviando reporte)",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        })
    }
});
$(document).ready(function ()
{
    var dataval= localStorage.getItem("g2r7t48rt24");
    if(dataval!=null)
    {
        //document.location.href = "buscador.html";
        document.location.href = "updates.html";
    }
});
