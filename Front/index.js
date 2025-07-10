//Trae a todos users
async function usuarios() {
    let result = await fetch('http://localhost:4000/usuarios',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    let usuarios = (await result).json()
    return usuarios
}

//Trae a todos los juegos
async function juegos(){
    let result = await fetch('http://localhost:4000/juegos',{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let juegos = await result.json()
    return juegos
}

//Agrega un nuevo usuario a la base de datos
async function nuevoUsuario(datos){
    let result = await fetch('http://localhost:4000/insertuser', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    })
    let nuevoUsuario = await result.json()
    return nuevoUsuario
}
function nuevosDatosUser(){
    let datos = {
        email: getEmail(),
        password: getPassword(),
        puntaje_max: 0,
        isAdmin: false
    }
    nuevoUsuario(datos)
}

//Agrega un nuevo juego a la base de datos
async function nuevoJuego(datos){
    let result = await fetch('http://localhost:4000/insertgame',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    let nuevoJuego = await result.json()
    console.log(nuevoJuego)
    alert("El juego ha sido agregado correctamente")  //fijarse si luego del alert el return sigue funcionando
    return nuevoJuego
}


//Elimiar juego
async function eliminarJuego(id_juego){
    let result = await fetch('http://localhost:4000/eliminarjuego',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_juego: id_juego })
    })
    juego_eliminar = await result.json()
    alert("El juego ha sido eliminado correctamente")
}


//Eliminar usuario
async function eliminarUsuario(id_user){
    let result = await fetch('http://localhost:4000/eliminarusuario',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_usuario: id_user })
    })
    usuario_eliminar = await result.json()
    alert("El usuario ha sido eliminado correctamente")
}

//Modificar juego
async function modificarJuego(modificar){
    await fetch('http://localhost:4000/modificarjuego',{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(modificar)

    })
   
    console.log("Juego modificado")
    document.getElementById('IdParaModificar').innerText = `ID: ${idParaModificar}`
    document.getElementById('IdModNombre').innerText = `Nombre: ${modificar.game_name}`
    document.getElementById('IdCantDesc').innerText = `Cantidad de descargas: ${modificar.cant_descargas}`
    document.getElementById('IdImagenModificar').src = `${modificar.imagen}`
}


