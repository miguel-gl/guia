//JavaScript
const { shell } = require('electron');
function quitarAcentos(cadena)
{
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}
function actualizacion()
{
    shell.openExternal('https://sistemasaudiovisualesinternacionales.com/Enciclopedia/actualizacion.html?vrs=1');
}
function get_busqueda()
{
    $('#accordion_resultados').html("");
    var busqueda=$('#buscador').val();  
    busqueda=quitarAcentos(busqueda);
    busqueda=busqueda.toLowerCase();
    
    // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/diccionario.json";
    $.getJSON(path_bd, function(datos) 
    {
        
        var json=datos["RECORDS"];
        //si hay un valor
        if (busqueda.length > 0) 
        {
            var idx=0;
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                var palabra =quitarAcentos(j.palabra);
                palabra=palabra.toLowerCase();
                if (palabra.includes(busqueda))
                {                    
                    resultados.push([j.palabra,j.definicion]);
                    // si lo incluye agregalo al array de los resultados
                }
                idx++;
            });
            //para cada elemento selccionado
            var i=1;
            resultados.forEach(s => 
            {
                $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[0]+'</button></h2></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body b-right"><p>'+s[1]+'</p></div></div></div>');
                i++;
            });
        }
    });


}
function get_letra(id)
{
    $('#accordion_resultados').html("");
    // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/diccionario.json";
    $.getJSON(path_bd, function(datos) 
    {
        var json=datos["RECORDS"];
        //si hay un valor
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var letra =j.letra;
            if (letra==id)
            {                    
                resultados.push([j.palabra,j.definicion]);
                // si lo incluye agregalo al array de los resultados
            }
            idx++;
        });
        //para cada elemento selccionado
        let i=1;
        resultados.forEach(s => 
        {
            $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[0]+'</button></h2></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body b-right"><p>'+s[1]+'</p></div></div></div>');
            i++;
        });
    });


}
function roles()
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
    roles();
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });
});