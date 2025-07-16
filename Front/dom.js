function mostrarLogIn() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('logIn').style.display = 'flex';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'none'
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none";
}

function mostrarInicio() {
    document.getElementById('inicio').style.display = 'flex';
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'none'
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById('audioBoton').style.display = 'none';
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none"
}

function mostrarJuego() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('juego').style.display = 'flex';
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'none'
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById('idCantDescargas2').style.display = 'none'
    document.getElementById('IdImagenRespuesta').style.display = 'none';
    document.getElementById("idVs").style.display = "flex";
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none"
}
function mostrarModal() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('modal-admin').style.display = 'flex';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'none'
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none"
}
function administrar(){
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('admin').style.display = 'flex';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'none'
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none"
}

function checkearJuego(){
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('juego').style.display = 'none';
    document.getElementById('modal-admin').style.display = 'none';
    document.getElementById('admin').style.display = 'none';
    document.getElementById('modal-modificar-juego').style.display = 'none';
    document.getElementById('otro-panel').style.display = 'flex'
    document.getElementById("modal-eliminar-usuario").style.display = "none";
    document.getElementById("modalPerdiste").style.display = "none";
    document.getElementById("modal-eliminar-juego").style.display = "none"
}
let idParaModificar = null
async function modalCambiarJuego(){
    const games = await juegos();
    let id_juego = getIdJuego()
    if (getIdJuego() == "") {
        return alert("Por favor, complete la casilla de modificar juego");
    }
    for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == id_juego) {
            console.log(id_juego)
            idParaModificar = id_juego
            document.getElementById('inicio').style.display = 'none';
            document.getElementById('logIn').style.display = 'none';
            document.getElementById('juego').style.display = 'none';
            document.getElementById('modal-admin').style.display = 'none';
            document.getElementById('admin').style.display = 'none';
            document.getElementById('modal-modificar-juego').style.display = 'flex';
            document.getElementById("modalPerdiste").style.display = "none";
            document.getElementById("modal-eliminar-usuario").style.display = "none";
            document.getElementById("modal-eliminar-juego").style.display = "none"
            return 1
        }
    }
    alert("El id no existe");
    
}
/*let modal1 = document.getElementById("modal-modificar-juego")
function openmodal() {
    modal1.showModal()
}
function closemodal() {
    modal1.close()
}*/
function getEmail() {
    return document.getElementById("email").value;
}

function getPassword() {
    return document.getElementById("contraseña").value;
}

//Trae las imagenes de la base de datos!!
/*async function mostrarImagen(){
    const juegosTraidos = await juegos()
    document.getElementById("juegoimagen").src = juegosTraidos[3].imagen
}*/

// Admin
function getGameName() {
    return document.getElementById("game_name").value;
}

function getCantDesc() {
    return document.getElementById("cantidad_descargas").value;
}

function getImagen() {
    return document.getElementById("imagen_juego").value
}

function getIdJuego(){
    return document.getElementById("id_juego").value
}

function getIdJuegoEliminar(){
    return document.getElementById("id_juego_eliminar").value
}

function getIdUser(){
    return document.getElementById("id_user").value
}

function getModName() {
    return document.getElementById("mod-nombre").value;
}

function getModDownloads() {
    return document.getElementById("mod-descargas").value;
}
function getModImg() {
    return document.getElementById("mod-imagen").value;
}
