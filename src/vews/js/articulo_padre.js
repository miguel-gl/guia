//JavaScript
function quitar_estilos(cadena)
{
    var newStr = cadena.replace(/"font-family:+[&quot;\w\,\-\s\.]+"/g,'""');
    newStr = newStr.replace(/font-family:+[&quot;\w\,\-\s\.]+;/g,'');
    newStr = newStr.replace(/"font-size:+[&quot;\w\,\-\s\.]+"/g,'""');
    newStr = newStr.replace(/font-size:+[&quot;\w\,\-\s\.]+;/g,'');
    return newStr;
}
function aleatorio(a,b)
{
    return Math.round(Math.random()*(b-a)+parseInt(a));
}
function get_articulo(id,id_bd)
{
    $.getJSON("bd/profesores/articulos_profesor.json", function(datos) 
    {
        var json=datos[2]["data"][id];
        var nivel = json['nivel'];
        var fos="14pt";
        if(nivel==1)
        {
            fos="16pt";
        }
        $('#titulo_subtema').html(json['subtema']);
        var quesignifica=json['que_siginifica'];
        quesignifica=quitar_estilos(quesignifica);
        $('#significa').html(quesignifica);
        $('#significa').css("font-size", fos);

        var resumen=json['resumen'];
        resumen=quitar_estilos(resumen);
        $('#desarrollo').html(resumen);
        get_parrafos(id_bd);
        discilpinas(json['nivel'],json['id_asignatura']);
    });
}
function get_parrafos(id)
{
    // el erray de los  resultados inicializado
    let parrafos = [];
    let imgs = [];
        $.getJSON("bd/profesores/profesores_parrafos_img.json", function(datos)
    {

        var json=datos[2]["data"];

        //si hay un valor
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_a=j.id_articulo;
            if (id_a==id)
            {
                // si lo incluye agregalo al array de los resultados
                imgs.push([j.orden,j.path,j.pie]);
            }
            idx++;
        });
        //para cada elemento selccionado
    });
    $.getJSON("bd/profesores/profesores_parrafos.json", function(datos)
    {

        var json=datos[2]["data"];

        //si hay un valor
        var idx=0;
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_a=j.id_articulo;
            if (id_a==id)
            {
                // si lo incluye agregalo al array de los resultados
                parrafos.push([j.orden,j.content]);
            }
            idx++;
        });
            var id_array=0;
    var i=1;
    parrafos.forEach(s => 
    {
        var path=imgs[id_array][1];
        if(path!=null)
        {
            var pie=imgs[id_array][2]
            if(pie!=null)
            {
                $("#desarrollo").append('<div class="container-fluid"><div class="d-flex flex-row flex-wrap justify-content-center"><div class="d-flex"><a data-fancybox="gallery" href="bd/profesores/'+path+'" class="img-theme" data-caption="'+pie+'"><img src="bd/profesores/'+path+'" class="img-fluid scale mb-2"><span>'+pie+'</span></a></div></div></div>');
            }
            else
            {
                $("#desarrollo").append('<div class="container-fluid"><div class="d-flex flex-row flex-wrap justify-content-center"><div class="d-flex"><a data-fancybox="gallery" href="bd/profesores/'+path+'" class="img-theme" data-caption="imagen'+i+'"><img src="bd/profesores/'+path+'" class="img-fluid scale mb-2"><span>imagen'+i+'</span></a></div></div></div>');
            }
        }
        id_array++;
        i++;
    });
        //para cada elemento selccionado
    });
    get_glosario(id);
}
function get_glosario(id)
{
    $('#glosario').html("");
    let glosario = [];
    var path_bd="bd/glosario.json";
    $.getJSON(path_bd, function(datos) 
    {

        var json=datos[2]["data"];
        // busca en el json si el nombre incluye (o empieza por) el valor
        json.forEach(j => 
        {
            var id_a = j.id_articulo;
            var tipo = j.tipo;
            if (id_a == id && tipo==2)
            {
                // si lo incluye agregalo al array de los resultados
                glosario.push([j.nombre,j.definicion]);
            }
        });
        //para cada elemento selccionado
        var i=1;
        glosario.forEach(s => 
        {
            $('#glosario').append('<div class="card"><div class="card-header" id="head_'+i+'"><h2 class="mb-0"><button type="button" class="btn btn-link acc-ciencia" data-toggle="collapse" data-target="#collapse_'+i+'"><i class="fa fa-plus"></i>'+s[0]+'</button></h2></div><div id="collapse_'+i+'" class="collapse" aria-labelledby="head_'+i+'" data-parent="#glosario"><div class="card-body b-right-green"><p>'+s[1]+'</p></div></div></div>');
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
function discilpinas(nivel,v_asignatura)
{
    var disciplina=localStorage.getItem("disciplina");
    var fos="14pt";
    if(nivel==1)
    {
        fos="16pt";
    }
    $('#que_aprendo').css("font-size", fos);
    if(disciplina==19)
    {
        $('#nombre_discilpina').html('Lenguajes');
        document.getElementById ("sidebar"). className = "bg-espanol";
        if(nivel==1)
        {
            var numero = aleatorio(1,4);
            console.log(numero);
            document.getElementById('portada_articulo').src='images/articulo/preescolar/espanol_'+numero+'.png';
        }
        if(nivel==2)
        {
            var numero = aleatorio(1,2);
            document.getElementById('portada_articulo').src='images/articulo/nivel/espanol_'+numero+'.png';
        }
        if(nivel==3)
        {
            var numero = aleatorio(1,2);
            document.getElementById('portada_articulo').src='images/articulo/nivel/espanol_'+numero+'.png';
        }
    }
    if(disciplina==1)
    {
        $('#nombre_discilpina').html('Saberes y <br>pensamiento <br>científico');
        document.getElementById ("sidebar"). className = "bg-matematicas";
        if(nivel==1)
        {
            var numero = aleatorio(1,2);
            document.getElementById('portada_articulo').src='images/articulo/preescolar/matematicas_'+numero+'.png';
        }
        if(nivel==2)
        {
            document.getElementById('portada_articulo').src='images/articulo/nivel/matematicas2.png';
        }
        if(nivel==3)
        {
            document.getElementById('portada_articulo').src='images/articulo/nivel/matematicas3.png';
        }
    }
    if(disciplina==18)
    {
        $('#nombre_discilpina').html('Ética, <br>Naturaleza y <br>Sociedades');
        document.getElementById ("sidebar"). className = "bg-ciencia";
        if(nivel==1)
        {
            var numero = aleatorio(1,4);
            document.getElementById('portada_articulo').src='images/articulo/preescolar/ciencias_'+numero+'.png';
        }
        if(nivel==2)
        {
            var numero = aleatorio(1,4);
            document.getElementById('portada_articulo').src='images/articulo/nivel/ciencias_'+numero+'.png';
        }
        if(nivel==3)
        {
            var numero = aleatorio(1,4);
            document.getElementById('portada_articulo').src='images/articulo/nivel/ciencias_'+numero+'.png';
        }
        
    }
    if(disciplina==21)
    {
        $('#nombre_discilpina').html('De lo Humano <br>y lo <br>Comunitario');
        document.getElementById ("sidebar"). className = "bg-ciencias_sociales";
        if(nivel==1)
        {
            var imagen = 'cienciassociales.png';
            if(v_asignatura==10)
            {
                imagen = 'historia.png';
            }
            document.getElementById('portada_articulo').src='images/articulo/preescolar/'+imagen;
        }
        if(nivel==2)
        {
            var numero = aleatorio(1,4);
            var imagen = 'cienciasociales_'+numero+'.png';
            if(v_asignatura==10)
            {
                imagen = 'historia.png';
            }
            document.getElementById('portada_articulo').src='images/articulo/nivel/'+imagen;
        }
        if(nivel==3)
        {
            var numero = aleatorio(1,4);
            var imagen = 'cienciasociales_'+numero+'.png';
            if(v_asignatura==10)
            {
                imagen = 'historia.png';
            }
            document.getElementById('portada_articulo').src='images/articulo/nivel/'+imagen;
        }
    }
    if(disciplina==5)
    {
        $('#nombre_discilpina').html('De lo Humano <br>y lo <br>Comunitario');
        document.getElementById ("sidebar"). className = "bg-ciencias_sociales";
        document.getElementById('portada_articulo').src='images/articulo/ciencias_sociales_1.png';
        if(nivel==1)
        {
            document.getElementById('portada_articulo').src='images/articulo/cienciassociales1.png';
        }
        if(nivel==2)
        {
            document.getElementById('portada_articulo').src='images/articulo/cienciassociales2.png';
        }
        if(nivel==2)
        {
            document.getElementById('portada_articulo').src='images/articulo/cienciassociales3.png';
        }
    }
}
// JQuery
$(document).ready(function () 
{
    roles();
    var id_articulo=localStorage.getItem("id_json");
    var id_articulo_bd=localStorage.getItem("id_bd");
    get_articulo(id_articulo,id_articulo_bd);
});