//JavaScript
const {webFrame} = require('electron');
webFrame.clearCache();
console.log('CLEARED');
const form = document.getElementById('form_busqueda');
form.addEventListener('submit', e =>
{
    e.preventDefault();
    get_busqueda();
});
function active()
{
    $('#accordion_resultados').html(""); 
    var tema= $('#temas_select').val();
    var busqueda= $('#temas_select_flexselect').val();
    busqueda=quitarAcentos(busqueda);
    busqueda=busqueda.toLowerCase();
    busqueda = busqueda.substring(0, busqueda.length - 2);
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var tema_storage=localStorage.getItem("select_tema");
    console.log('proceso:' +tema_storage);
    var asignatura= $('#asignatura').val();
    var disciplina = localStorage.getItem("disciplina");
    var rol = localStorage.getItem("rol");

        // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    if(rol==1)
    {
        path_bd="bd/alumnos/articulos.json";
    }
    $.getJSON(path_bd, function(datos) 
    {
        var json=datos[2]["data"];
        //si hay un valor
        if (busqueda.length > 0) 
        {
            var idx=0;
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                
                var subtema =quitarAcentos(j.subtema);
                subtema=subtema.toLowerCase();
                var nivel_bd = j.nivel;
                var id_diciplina = j.id_diciplina;
                var id_asignatura = j.id_asignatura;
                var tema_bd = j.id_tema;
                var cuerpo="";
                let css = "";
                let css2 = "";
                let css3 = "";
                if(rol==1)
                {
                    cuerpo=j.que_siginifica;
                }
                else 
                {
                    cuerpo=j.resumen;
                }

                    if(tema==tema_bd)
                    {
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
                        }
                        if(asignatura!=0)
                        {
                            if(id_asignatura==asignatura)
                            {
                                if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                                if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                                if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                            }
                        }
                        else
                        {
                            
                            if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                            if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                            if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                        }
                        // si lo incluye agregalo al array de los resultados
                    }
                idx++;
            });
            //para cada elemento selccionado
            var i=1;
            resultados.forEach(s =>
            {
                $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" onclick="leer_articulo('+s[5]+','+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
                i++;
            });
        }
    });
}
function quitarAcentos(cadena)
{
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}
function get_nombre_tema(id)
{
    var path_bd="bd/temas.json";
    $.getJSON(path_bd, function(datos) 
    {
        var json=datos[2]["data"];
        json.forEach(j => 
        {
            var id_bd = j.id;
            if(id_bd==id)
            {
                var nombre_tema = quitarAcentos(j.nombre);
                nombre_tema=nombre_tema.toLowerCase();
                return nombre_tema;
            }
        });
    });
}
function get_busqueda()
{
    $('#accordion_resultados').html(""); 
    var tema= $('#temas_select').val();
    var busqueda= $('#temas_select_flexselect').val();
    busqueda=quitarAcentos(busqueda);
    busqueda=busqueda.toLowerCase();
    busqueda = busqueda.substring(0, busqueda.length - 2);
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var tema_storage=localStorage.getItem("select_tema");
    console.log('proceso:' +tema_storage);
    var asignatura= $('#asignatura').val();
    var disciplina = localStorage.getItem("disciplina");
    var rol = localStorage.getItem("rol");

        // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    if(rol==1)
    {
        path_bd="bd/alumnos/articulos.json";
    }
    $.getJSON(path_bd, function(datos) 
    {
        var json=datos[2]["data"];
        //si hay un valor
        if (busqueda.length > 0) 
        {
            var idx=0;
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                
                var subtema =quitarAcentos(j.subtema);
                subtema=subtema.toLowerCase();
                var nivel_bd = j.nivel;
                var id_diciplina = j.id_diciplina;
                var id_asignatura = j.id_asignatura;
                var tema_bd = j.id_tema;
                var cuerpo="";
                let css = "";
                let css2 = "";
                let css3 = "";
                if(rol==1)
                {
                    cuerpo=j.que_siginifica;
                }
                else 
                {
                    cuerpo=j.resumen;
                }
                    if(busqueda!='Buscar...')
                    {
                        if (subtema.includes(busqueda))
                        {
                            if(id_diciplina==disciplina)
                            {
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
                                }
                                if(asignatura!=0)
                                {
                                    if(id_asignatura==asignatura)
                                    {
                                        if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                                        if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                                        if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                                    }
                                }
                                else
                                {
                                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                                }
                                // si lo incluye agregalo al array de los resultados
                            }
                            
                        }
                    }
                idx++;
            });
            //para cada elemento selccionado
            var i=1;
            resultados.forEach(s =>
            {
                $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" onclick="leer_articulo('+s[5]+','+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
                i++;
            });
        }
    });
}
function articulos_ciencia(n_asignatura)
{
    $('#accordion_resultados').html("");
    var tema = $('#asignatura_'+n_asignatura).val();
    $('#asignatura').val(tema);
    var disciplina = localStorage.getItem("disciplina");
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var rol = localStorage.getItem("rol");
        // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    if(rol==1)
    {
        path_bd="bd/alumnos/articulos_preescolar.json";
    }
    $.getJSON(path_bd, function(datos) 
    {

        var json=datos[2]["data"];
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_diciplina = j.id_diciplina;
            var id_asignatura = j.id_asignatura;
            var tema_bd = j.tema;
            var nivel_bd = j.nivel;
            var cuerpo="";
            if(rol==1)
            {
                cuerpo=j.que_siginifica;
            }
            else 
            {
                cuerpo=j.resumen;
            }
            
            if (id_diciplina==disciplina)
            {
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
                }
                
                if(tema_bd==tema)
                {
                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                    // si lo incluye agregalo al array de los resultados
                }

            }
            idx++;
        });
        //para cada elemento selccionado
        var i=1;
        resultados.forEach(s => 
        {
            $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" onclick="leer_articulo(0,'+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
            i++;
        });
    });
    
}
function articulos_ciencia_n2()
{
    $('#accordion_resultados').html("");
    var asignatura = $('#asignatura_select').val();
    temas(asignatura);
    var disciplina = localStorage.getItem("disciplina");
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var rol = localStorage.getItem("rol");
        // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    if(rol==1)
    {
        path_bd="bd/alumnos/articulos.json";
    }
    $.getJSON(path_bd, function(datos) 
    {

        var json=datos[2]["data"];
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_diciplina = j.id_diciplina;
            var id_asignatura = j.id_asignatura;
            var nivel_bd = j.nivel;
            var cuerpo="";
            if(rol==1)
            {
                cuerpo=j.que_siginifica;
            }
            else 
            {
                cuerpo=j.resumen;
            }
            if (id_diciplina==disciplina)
            {
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
                }
                if(id_asignatura==asignatura)
                {
                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                    // si lo incluye agregalo al array de los resultados
                }

            }
            idx++;
        });
        //para cada elemento selccionado
        var i=1;
        resultados.forEach(s => 
        {
            $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" onclick="leer_articulo('+s[5]+','+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
            i++;
        });
    });
    
}
function articulos_tema(n_tema)
{
    $('#accordion_resultados').html("");
    var disciplina = localStorage.getItem("disciplina");
    var tema = $('#tema_'+n_tema).val();
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var rol = localStorage.getItem("rol");
        // el erray de los  resultados inicializado
    let resultados = [];
    var path_bd="bd/profesores/articulos_profesor.json";
    if(rol==1)
    {
        path_bd="bd/alumnos/articulos_preescolar.json";
    }
    $.getJSON(path_bd, function(datos) 
    {

        var json=datos[2]["data"];
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_diciplina = j.id_diciplina;
            var id_tema = j.tema;
            var nivel_bd = j.nivel;
            var cuerpo="";
            if(rol==1)
            {
                cuerpo=j.que_siginifica;
            }
            else 
            {
                cuerpo=j.resumen;
            }
            if (id_diciplina==disciplina)
            {
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
                }
                if(id_tema==tema)
                {
                    if(pre==1){if(nivel_bd==1){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Preescolar",idx,css,css2,css3]);}}
                    if(pri==1){if(nivel_bd==2){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Primaria",idx,css,css2,css3]);}}
                    if(sec==1){if(nivel_bd==3){resultados.push([j.id,j.subtema,cuerpo,j.id_diciplina,"Secundaria",idx,css,css2,css3]);}}
                    // si lo incluye agregalo al array de los resultados
                }

            }
            idx++;
        });
        //para cada elemento selccionado
        var i=1;
        resultados.forEach(s => 
        {
            $('#accordion_resultados').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link '+s[6]+'" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[1]+'</button></h2><p>'+s[4]+'</p></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#accordion_resultados"><div class="card-body '+s[7]+'"><p>'+s[2]+'<a style="cursor:pointer;" class="leer-mas '+s[8]+'" id,id_d,id_bd onclick="leer_articulo(0,'+s[3]+','+s[0]+')">Leer Más</a></p></div></div></div>');
            i++;
        });
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
function ciencias(id)
{
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    //$('#asignatura_cont').show();
    $('#asignatura_select').html('<option value="0">Todos</option>');
    let resultados = [];
    var path_bd="bd/asignaturas.json";
    $.getJSON(path_bd, function(datos) 
    {
        var json=datos[2]["data"];
        var idx=0;
        
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_asignatura=j.id;
            var id_diciplina = j.id_disciplina;
            if(id_diciplina==id)
            {
                if(sec==1)
                {
                    if(id_asignatura==15)//Ciencias Naturales
                    {
                        if(pri==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else if(id_asignatura==25)//Mundo Natural
                    {
                        if(pre==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else if(id_asignatura==16)//socilaizacion
                    {
                        if(pre==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else if(id_asignatura==26)//Desarrollo emocional
                    {
                        if(pre==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else
                    {
                        resultados.push([j.id,j.nombre]);
                    }
                }
                else if(pri==1)
                {
                    if(id_asignatura==16)//socilaizacion
                    {
                        if(pre==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else if(id_asignatura==17)//Formación cívica y ética 24
                    {
                        if(pre==1 || sec==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else if(id_asignatura==26)//Desarrollo emocional
                    {
                        if(pre==1)
                        {
                            resultados.push([j.id,j.nombre]);
                        }
                    }
                    else
                    {
                        resultados.push([j.id,j.nombre]);
                    }
                }
                // si lo incluye agregalo al array de los resultados
                
            }
            idx++;
        });
        //para cada elemento selccionado
        var i=1;
        resultados.forEach(s => 
        {
            $('#asignatura_select').append('<option value="'+s[0]+'">'+s[1]+'</option>');
            i++;
        });
    });
}
function temas(id_asignatura)
{
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var rol = localStorage.getItem("rol");
    var disciplina=localStorage.getItem("disciplina");
    var directorio="alumnos";
    if(rol!=1)
    {
        directorio="profesores"
    }
    $('#temas_select').html('<option value="" disabled selected>Buscar...</option>');
    let resultados = [];
    if(pre==1)
    {
        var path_bd="bd/"+directorio+"/temas_1.json";
        $.getJSON(path_bd, function(datos) 
        {
            var json=datos[2]["data"];
            var idx=0;
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                var id_diciplina = j.id_disciplina;
                var id_a = j.id_asignatura;
                if(id_diciplina==disciplina)
                {
                    if(id_asignatura!=0)
                    {
                        if(id_asignatura==id_a)
                        {
                            $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Preescolar)</option>');
                        }
                    }
                    else
                    {
                        $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Preescolar)</option>');
                    }
                }
                
            });
            $('#temas_select').flexselect({
                allowMismatch:true,
                inputNameTransform: function(name) {"new_" + name;}
            });
        });
    }
    if (pri==1)
    {
        var path_bd="bd/"+directorio+"/temas_2.json";
        $.getJSON(path_bd, function(datos) 
        {
            var json=datos[2]["data"];
            var idx=0;
            
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                var id_diciplina = j.id_disciplina;
                var id_a = j.id_asignatura;
                if(id_diciplina==disciplina)
                {
                    if(id_asignatura!=0)
                    {
                        if(id_asignatura==id_a)
                        {
                            $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Primaria)</option>');
                        }
                    }
                    else
                    {
                        $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Primaria)</option>');
                    }
                }
                
            });
            $('#temas_select').flexselect({
                allowMismatch:true,
                inputNameTransform: function(name) {"new_" + name;}
            });
        });
    }
    if (sec==1)
    {
        var path_bd="bd/"+directorio+"/temas_3.json";
        $.getJSON(path_bd, function(datos) 
        {
            var json=datos[2]["data"];
            var idx=0;
            
            // busca en el json si el nombre incluye (o empieza por) el valor
            json.forEach(j => 
            {
                var id_diciplina = j.id_disciplina;
                var id_a = j.id_asignatura;
                if(id_diciplina==disciplina)
                {
                    if(id_asignatura!=0)
                    {
                        if(id_asignatura==id_a)
                        {
                            $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Secundaria)</option>');
                        }
                    }
                    else
                    {
                        $('#temas_select').append('<option value="'+j.id+'">'+j.nombre+ ' (Secundaria)</option>');
                    }
                }
                
            });
            $('#temas_select').flexselect({
                allowMismatch:true,
                inputNameTransform: function(name) {"new_" + name;}
            });
        });
    }
}
function discilpinas()
{
    var disciplina=localStorage.getItem("disciplina");
    var pre=localStorage.getItem("pre");
    var pri=localStorage.getItem("pri");
    var sec=localStorage.getItem("sec");
    var rol = localStorage.getItem("rol");
    if(disciplina==19)
        {
            if(pre==1)
            {
                if(rol==1)
                {
                    $('#tronco').hide();
                    $('#especial').hide();
                }
            }
            document.getElementById('img_disciplina').src='images/campos/lenguaje.png';
            $('#nombre_discilpina').html('Lenguajes');
            document.getElementById ("sidebar"). className = "bg-espanol";
            $('#titulo_disciplina').html("Se encarga de abordar el conjunto de reglas y normas cuya funci&oacute;n es especificar los principios que rigen el uso del lenguaje.");
            $('#tema_1').val(1);
            $('#tema_2').val(2);
            $('#tema_3').val(3);
            $('#tema_4').val(4);

            $('#nombre_tema_1').html("Oralidad");
            $('#nombre_tema_2').html("Literatura");
            $('#nombre_tema_3').html("Estudio");
            $('#nombre_tema_4').html("Participación Social");

        }
        if(disciplina==1)
        {
            if(pre==1)
            {
                if(rol==1)
                {
                    $('#tronco').hide();
                    $('#especial').hide();
                }
            }
            document.getElementById('img_disciplina').src='images/campos/cientifico.png';
            $('#nombre_discilpina').html('Saberes y <br>pensamiento <br>científico');
            document.getElementById ("sidebar"). className = "bg-matematicas";
            $('#titulo_disciplina').html("Se dedica al estudio de las propiedades de los entes abstractos y de sus relaciones.");
            $('#tema_1').val(5);
            $('#tema_2').val(6);
            $('#tema_3').val(7);

            $('#nombre_tema_1').html("Números, Algebra y Variación");
            $('#nombre_tema_2').html("Forma, Espacio y Medida");
            $('#nombre_tema_3').html("Análisis de Datos");
            $('#t_4').hide();
        }
        if(disciplina==18)
        {
            
            if(pre==1)
            {
                if(rol==1)
                {
                    $('#tronco').hide();
                    $('#especial').hide();
                }
            }
            if(sec==1)
            {
                ciencias(18);
            }
            document.getElementById('img_disciplina').src='images/campos/etica.png';
            $('#nombre_discilpina').html('Ética, <br>Naturaleza y <br>Sociedades');
            document.getElementById ("sidebar"). className = "bg-ciencia";
            $('#titulo_disciplina').html("Conjunto de conocimientos relacionados con las matemáticas, la física, la química, la biología y la geología y otras materias que obedecen a leyes matemáticas y físicas.");

            $('#asignatura_1').val(8);
            $('#asignatura_2').val(9);
            $('#asignatura_3').val(10);
            $('#asignatura_4').val(11);
            
            $('#nombre_asignatura_1').html("Exploración de la Naturaleza");
            $('#nombre_asignatura_2').html("Cuidado de la Salud");
            $('#nombre_asignatura_3').html("Medio Ambiente");
            $('#nombre_asignatura_4').html("Animales"); 
            $('#figure_5').hide();
            $('#figure_6').hide();

        }
        if(disciplina==21)
        {
            if(pre==1)
            {
                if(rol==1)
                {
                    $('#tronco').hide();
                    $('#especial').hide();
                }
            }
            if(pri==1 || sec==1)
            {
                ciencias(21);
            }
            document.getElementById('img_disciplina').src='images/campos/humano.png';
            $('#nombre_discilpina').html('De lo Humano <br>y lo <br>Comunitario');
            document.getElementById ("sidebar"). className = "bg-ciencias_sociales";
            $('#titulo_disciplina').html("Ciencias que estudian el comportamiento &nbsp;del hombre en la sociedad y sus formas de organizaci&oacute;n");


            $('#asignatura_1').val(12);
            $('#asignatura_2').val(13);
            $('#asignatura_3').val(14);
            $('#asignatura_4').val(15);



            $('#nombre_asignatura_1').html("Interacciones Sociales");
            $('#nombre_asignatura_2').html("Cambios en el Tiempo");
            $('#nombre_asignatura_3').html("Educación Socioemocional");
            $('#nombre_asignatura_4').html("Arte");

            $('#figure_5').hide();
            $('#figure_6').hide();
        }
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
    $.ajaxSetup({ cache: false });
    localStorage.setItem('select_tema', '0');
    var sel = localStorage.getItem("select_tema");
    console.log('inicio: '+sel);
    temas(0);
    roles();
    discilpinas();
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });
    $('.slider').bxSlider({
        infiniteLoop: true,
        speed: 300,
        auto: true,
        controls: true,
        autoControls: false,
        stopAutoOnClick: true,
        pager: false
    });
});