//JavaScript


function roles(id)
{
    document.cookie = "rol="+id;
    document.location.href = "buscador.html";
}
// JQuery
$(document).ready(function () 
{
    document.cookie = "busqueda=404";
    $('#sidebarCollapse').on('click', function () 
    {
        $('#sidebar').toggleClass('active');
    });  
});