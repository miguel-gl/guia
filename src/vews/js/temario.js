//JavaScript
const form = document.getElementById('form_busqueda');
function buscar()
{
    var busqueda= $('#buscador').val();
    localStorage.setItem("busqueda",busqueda);
    document.location.href = "resultados.html";
}
function actualizacion()
{
    shell.openExternal('https://sistemasaudiovisualesinternacionales.com/Enciclopedia/actualizacion.html?vrs=1');
}
function disciplina(id)
{
    localStorage.setItem("disciplina",id);
    document.location.href = "disciplina.html";
}
function ver(id_bd,id_d)
{
    var rol = localStorage.getItem("rol");
    localStorage.setItem("disciplina",id_d);
    localStorage.setItem("id_bd",id_bd);
    if(rol==1)
    {
        document.location.href = "articulo_t_a.html";
    }
    if(rol==2)
    {
        document.location.href = "articulo_t_profesor.html";
    }
    if(rol==3)
    {
        document.location.href = "articulo_t_padre.html";
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
  var roles = localStorage.getItem("rol");
  var path = "alumnos";
  if(roles!=1)
  {
      path = "profesores";
  }
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });
    $('#tabla').DataTable(
        {
            rowReorder: {
                selector: 'td:nth-child(2)'
            },
                responsive: true,
                destroy: true,
                ordering: true,
                searching: true,
                search: true,
                paging: true,
                lengthMenu: [[10, 50, 100], [10, 50, 100]],
                ajax: {
                url: 'bd/'+path+'/articulos_vista.json',
                dataSrc: ""
                },
                createdRow: function (row, data, dataIndex) {
                $(row).addClass('redClass');
                },
                language: {
                url: "js/plugins/spanish.json",
                dataSrc: ''
                },
                columns: [
                    { data: 'disciplina' },
                    { data: 'asignatura' },
                    { data: 'tema' },
                    { data: 'subtema'},
                    { data: 'nivel'},
                    { data: 'subtema' }
                ],
                columnDefs: [
                {
                    targets: [0, 1], // Índices de las columnas que quieres ocultar (0 para la primera, 1 para la segunda)
                    visible: false
                },
                {
                    targets: 5,
                    data: 0,
                    render: function (txt, type, full) {
                    var clave =  full['id'];
                    var disciplina =  full['id_diciplina'];
                                var Acciones ="";
                                Acciones+='<i class="fa fa-rocket" title="Ver" data-toggle="modal" data-target="#" onclick="ver(' + clave + ','+disciplina+')" style="cursor:pointer;"></i>&nbsp;&nbsp;'; 
                                return Acciones;
                    }
                        }
                    ]
        });
});