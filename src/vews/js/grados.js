//JavaScript
const Swal = require('sweetalert2');
function grados(id)
{
    if(id==1)
    {
        var pre=localStorage.getItem("pre");
        if(pre!=null)
        {
            if(pre==0){localStorage.setItem("pre","1");}
            if(pre==1){localStorage.setItem("pre","0");}
        }
    }
    if(id==2)
    {
        var pri=localStorage.getItem("pri");
        if(pri!=null)
        {
            if(pri==0){localStorage.setItem("pri","1");}
            if(pri==1){localStorage.setItem("pri","0");}
        }
    }
    if(id==3)
    {
        var sec=localStorage.getItem("sec");
        if(sec!=null)
        {
            if(sec==0){localStorage.setItem("sec","1");}
            if(sec==1){localStorage.setItem("sec","0");}
        }
    }
}
function siguiente()
{
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    if(pre==0 )
    {
        if(pri==0)
        {
            if(sec==0)
            {
                Swal.fire({
                    title: 'Incorrecto',
                    text: "Activa al menos un nivel",
                    icon: 'info',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
                }) 
            }
            else
            {
                Swal.fire({
                    title: 'Correcto',
                    text: "Configuración Finalizada, ¡empieza a navegar!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                    allowOutsideClick: false
                }).then((result) => {
                    document.location.href = "buscador.html";
                });
            }
        }
        else
        {
            Swal.fire({
                title: 'Correcto',
                text: "Configuración Finalizada, ¡empieza a navegar!",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false
            }).then((result) => {
                document.location.href = "buscador.html";
            });
        }
    }
    else
    {
        Swal.fire({
            title: 'Correcto',
            text: "Configuración Finalizada, ¡empieza a navegar!",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
        }).then((result) => {
            document.location.href = "buscador.html";
        });
    }
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
// JQuery
$(document).ready(function () 
{
    localStorage.setItem("pre","0");
    localStorage.setItem("pri","0");
    localStorage.setItem("sec","0");
    rol();
});