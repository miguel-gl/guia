//JavaScript
//const remote = require('electron').remote
//const main = remote.require('./index.js');

function roles(id)
{
    /*const rol_json = '{"RECORDS": [{"rol": "'+id+'"}]}';
    main.crea_archivo(rol_json,"rol.json");*/
    localStorage.setItem("rol",id);
    document.location.href = "grados.html";
}
