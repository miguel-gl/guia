//JavaScript
const form = document.getElementById('form_datos');
form.addEventListener('submit', e =>
{
    const nombre = document.getElementById('nombre').value;
    document.location.href = "rol.html";
    localStorage.setItem("nombre",nombre);
    e.preventDefault();
});
