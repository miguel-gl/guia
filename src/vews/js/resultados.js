//JavaScript
function unicode(string)
{
    string = string.replace(/&ntilde;/g, 'ñ');
    string = string.replace(/&Ntilde;/g, 'Ñ');
    string = string.replace(/&aacute;/g, 'á');
    string = string.replace(/&eacute;/g, 'é');
    string = string.replace(/&iacute;/g, 'í');
    string = string.replace(/&oacute;/g, 'ó');
    string = string.replace(/&uacute;/g, 'ú');
    string = string.replace(/&Aacute;/g, 'Á');
    string = string.replace(/&Eacute;/g, 'É');
    string = string.replace(/&Iacute;/g, 'Í');
    string = string.replace(/&Oacute;/g, 'Ó');
    string = string.replace(/&Uacute;/g, 'Ú');

    return string;
}
function quitarAcentos(cadena)
{
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}
function get_nombre_tema(id)
{

}
function get_busqueda(busqueda,rol)
{
    $('#result_busqueda').html('Resultados de la Busqueda "'+busqueda+'"');
    busqueda=quitarAcentos(busqueda);
    busqueda=busqueda.toLowerCase();
    busqueda = busqueda.substring(0, busqueda.length - 2);
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    // el array de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    

    if(rol==1)
    {
        path_bd="bd/alumnos/articulos.json";
    }
    $.getJSON(path_bd, function(datos) 
    {

        json=datos[2]["data"];
        //si hay un valor
        if (busqueda.length > 0) 
        {
            var idx=0;
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                var subtema =quitarAcentos(j.subtema);
                var que_siginifica =j.que_siginifica;
                console.log(unicode(que_siginifica));
                que_siginifica=que_siginifica.toLowerCase();
                subtema=subtema.toLowerCase();
                var nivel_bd = j.nivel;
                var id_tema = j.id_tema;
               
                var tema_bd=get_nombre_tema(j.tema);
                var cuerpo="";
                let css = "";
                let css2 = "";
                let css3 = "";
                switch(j.id_diciplina)
                {
                    case "18": css = "acc-ciencia"; css2 = "b-right-green"; css3 = "text-green";
                    break;
                    case "19": css = "acc-espanol"; css2 = "b-right-red"; css3 = "text-red";
                     break;
                    case "1": css = "acc-matematicas"; css2 = "b-right-blue"; css3 = "txt-blue";
                     break;
                    case "21": css = "acc-ciencias_sociales"; css2 = "b-right-yellow"; css3 = "text-yellow";
                     break;
                     default: 
                             css = ""; css2= ""; css3="";
                }//[3,6,7,8]
                     
                if(rol==1)
                {
                    cuerpo=j.que_siginifica;
                }
                else 
                {
                    cuerpo=j.resumen;
                }
                if (subtema.includes(busqueda))
                {
                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                }
                else if(que_siginifica.includes(busqueda))
                {
                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                }
                else
                {
                    

                    /*$.getJSON('bd/temas.json', function(datos_tema) 
                    {
                        var json=datos_tema[2]["data"];
                        
                        
                        json.forEach(t => 
                        {
                            var id_bd = t.id;
                            if(id_bd==id_tema)
                            {
                                var nombre_tema = quitarAcentos(t.nombre);
                                nombre_tema=nombre_tema.toLowerCase();
                                let expresion = new RegExp(`${'historia de mexico'}.*`);
                                //console.log('tema: '+nombre_tema);
                                if (expresion.test(nombre_tema))
                                {
                                    console.log('tema '+nombre_tema);
                                    /*if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                                }
                                else
                                {
                                    console.log('nok');
                                }
                                
                            }
                        });
                    });*/
                }
                idx++;

                
            });
            $('#accordion_resultados').html("");
            //para cada elemento selccionado
            i=1;
            resultados.forEach(s => 
            {
                

                $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" onclick="leer_articulo('+s[5]+','+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
                i++;
                console.log('tema: ', s[1],'/',s[3], '/', s[6]);
            });
        }
    });


}
function leer_articulo(id,id_d,id_bd)
{
    var rol = localStorage.getItem("rol");
    localStorage.setItem("disciplina",id_d);
    localStorage.setItem("id_json",id);
    localStorage.setItem("id_bd",id_bd);
    if(rol==1)
    {
        document.location.href = "articulo.html";
    }
    if(rol==2)
    {
        document.location.href = "articulo_profesor.html";
    }
    if(rol==3)
    {
        document.location.href = "articulo_padre.html";
    }
}
function disciplina(id)
{
    localStorage.setItem("disciplina",id);
    document.location.href = "disciplina.html";
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
    var rol = localStorage.getItem("rol");
    var busqueda = localStorage.getItem("busqueda");
    get_busqueda(busqueda,rol);
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });

});