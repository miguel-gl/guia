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
function get_articulo(id)
{
    
    $.getJSON("bd/profesores/articulos_profesor.json", function(datos) 
    {
        var json=datos[2]["data"];
        json.forEach(j => 
            {
                var id_a=j.id;
                if (id==id_a)
                {
                    var nivel = j.nivel;
                    console.log(nivel);
                    var fos="14pt";
                    if(nivel==1)
                    {
                        fos="16pt";
                    }
                    // si lo incluye agregalo al array de los resultados
                    $('#titulo_subtema').html(j.subtema);
                    var quesignifica=j.que_siginifica;
                    quesignifica=quitar_estilos(quesignifica);
                    $('#significa').html(quesignifica);
                    $('#significa').css("font-size", fos);

                    var resumen=j.resumen;
                    resumen=quitar_estilos(resumen);
                    $('#desarrollo').html(resumen);
                    discilpinas(j.nivel,j.id_asignatura);
                }
            });
    });
    get_parrafos(id);
}

function get_parrafos(id)
{
    $('#desarrollo').html('');
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
                console.log('okx');
                // si lo incluye agregalo al array de los resultados
                parrafos.push([j.orden,j.content]);
            }
            idx++;
        });
            var id_array=0;
    var i=1;
    parrafos.forEach(s => 
    {
        var desarrollo=s[1];
        desarrollo=quitar_estilos(desarrollo);
        $('#desarrollo').append('<div class="tema-box">'+desarrollo+'</div>');
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
            if (id_a == id && tipo==1)
            {
                // si lo incluye agregalo al array de los resultados
                glosario.push([j.nombre,j.definicion]);
            }
        });
        //para cada elemento selccionado
        var i=1;
        var tamaño = glosario.length;
        if(tamaño>0)
        {
            $('#div_glosario').show();   
        }
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
        $('#nombre_discilpina').html('Español');
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
        $('#nombre_discilpina').html('Matemáticas');
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
        $('#nombre_discilpina').html('Ciencias');
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
        $('#nombre_discilpina').html('Ciencias <br> Sociales');
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
        $('#nombre_discilpina').html('Ciencias <br> Sociales');
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
function juego(id)
{
    var url = "bd/alumnos/media/"+id+"/game/index.html";
    try {
        var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    var exist = http.status;
    if(exist!=400)
    {
        $('#Recursos').show();
         $('#gameOk').show();
        document.getElementById('game').innerHTML = '<a data-fancybox data-type="iframe" href="' + url + '"><img class="recursos-img hvr-pop" src="images/iconos/rompecabezas.png" alt="Game"></a>';
    }
      } catch (e) {
        console.log('no hay');
      }
}

function quiz(id)
{
    var url = "bd/alumnos/media/"+id+"/quiz/index.html";
    try {
        var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    var exist = http.status;
    if(exist!=400)
    {
        $('#Recursos').show();
        $('#quizOk').show();
        document.getElementById('quiz').innerHTML = '<a data-fancybox data-type="iframe" href="' + url + '"><img class="recursos-img hvr-pop" src="images/iconos/choose.png" alt="Quiz"></a>';
    }
      } catch (e) {
        console.log('no hay');
      }
}
function imp(id)
{
    var url = "bd/alumnos/media/"+id+"/imprimible.pdf";
    try {
        var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    var exist = http.status;
    if(exist!=400)
    {
        $('#Recursos').show();
        $('#impOk').show();
        document.getElementById('imp').innerHTML = '<a data-fancybox data-type="iframe" href="' + url + '"><img class="recursos-img hvr-pop" src="images/iconos/imp.png" alt="Imprimible"></a>';
    }
      } catch (e) {
        console.log('no hay');
      }
}
function iVideo(id) 
{
var url = "bd/alumnos/media/"+id+"/video.txt";

fetch(url)
  .then(res => res.text())
  .then(content => {
    var lines = content.split(/\n/);//se convierte el string en un array, si existe el txt devuelve 1 sino 10
    if(lines.length >= 10){
        console.log('Video Not Found :(');
    }else {
         lines.forEach( txt => {
             $('#Recursos').show();
                $('#videoOk').show();
                document.getElementById('video').innerHTML = '<a data-fancybox href="' + txt + '"><img class="recursos-img hvr-pop" src="images/iconos/multimedia.png" alt="Video"></a>';
            });
    }
    return;
  })
}



// JQuery
$(document).ready(function () 
{
    roles();
    var id_articulo_bd = localStorage.getItem("id_bd");
    get_articulo(id_articulo_bd);
    console.log('Id art: ', id_articulo_bd );
});