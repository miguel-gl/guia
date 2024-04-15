//JavaScript
const { ipcRenderer, webFrame} = require('electron');
const Swal = require('sweetalert2');
const form = document.getElementById('form_busqueda');
webFrame.clearCache();
console.log('CLEARED');



function rol()
{
    var nombre = localStorage.getItem("nombre");
    $('#dropdownMenuButton').html(nombre);
    var rol = localStorage.getItem("rol");
    if(rol==1)
    {
        $('#dropdownMenuButton').append('. <img src="images/iconos/usuario/alumno.png" width="40" height="40" class="rounded-circle">');
    }
    if(rol==2)
    {
        $('#dropdownMenuButton').append('. <img src="images/iconos/usuario/docente.png" width="40" height="40" class="rounded-circle">');
    }
    if(rol==3)
    {
        $('#dropdownMenuButton').append('. <img src="images/iconos/usuario/padre.png" width="40" height="40" class="rounded-circle">');
    }
}
function getUpdates(){
    console.log('getUpdates');
    var validata=ipcRenderer.sendSync('update','1.0.1');
    console.log('resultado de la descarga: '+ validata);
    if(validata==200)
    {
        var loadUpdate=ipcRenderer.sendSync('reUpdate');
        if(loadUpdate==200)
        {
            Swal.fire({
                title: 'Actualización',
                text: "La actualización se ha descargado con éxito",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            }).then((result) => {
                document.location.href = "buscador.html";
            })  
        }
    }
    else{
        document.location.href = "buscador.html";
    }
}
// JQuery
$(document).ready(function () 
{
    $.ajaxSetup({ cache: false });
    rol();
    getUpdates();
});