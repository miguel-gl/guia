//JavaScript
const { shell } = require('electron');
const Swal = require('sweetalert2');
const form = document.getElementById('form_busqueda');
const {webFrame} = require('electron');
webFrame.clearCache();
console.log('CLEARED');
form.addEventListener('submit', e =>
{
    e.preventDefault();
    buscar();
});
function actualizacion()
{
    shell.openExternal('https://sistemasaudiovisualesinternacionales.com/Enciclopedia/actualizacion.html?vrs=2');
}
function buscar()
{
    var busqueda= $('#buscador').val();
    localStorage.setItem("busqueda",busqueda);
    document.location.href = "resultados.html";
}
function disciplina(id)
{
    localStorage.setItem("disciplina",id);
    document.location.href = "disciplina.html";
}
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
function temario_pre()
{
    /*Swal.fire({
        html:
            '<iframe src="bd/temario_preescolar.pdf#toolbar=0&zoom=75"  width="100%" height="800px"></iframe>',
        width: 1200,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    }).then((result) => {
        
    });*/
}
function temario_pri()
{
    Swal.fire({
        html:
            '<iframe src="bd/temario_primaria.pdf#toolbar=0&zoom=75"  width="100%" height="800px"></iframe>',
        width: 1200,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    }).then((result) => {
        
    });
}
function temario_sec()
{
    Swal.fire({
        html:
            '<iframe src="bd/temario_secundaria.pdf#toolbar=0&zoom=75"  width="100%" height="800px"></iframe>',
        width: 1200,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        allowOutsideClick: false
    }).then((result) => {
        
    });
}
// JQuery
$(document).ready(function () 
{
    $.ajaxSetup({ cache: false });
  rol();
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });  
});