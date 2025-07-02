// Punto 1
/*async function llenarTabla(){
    let tabla = document.getElementById("tabla").innerHTML
    let result = await fetch('http://localhost:4001/padres',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let padres = await result.json()
    for (i = 0; i < padres.length; i++){
        tabla += `<tr>
        <td>${padres[i].dni_padre}</td>
        <td>${padres[i].dni_madre}</td>
        <td>${padres[i].apellido_padre}</td>
        <td>${padres[i].apellido_madre}</td>
        </tr>`
    }
    document.getElementById("tabla").innerHTML = tabla;
}

// Punto 2
async function agregarPadre(datos){
    let tabla = document.getElementById("tabla").innerHTML
        response = await fetch(`http://localhost:4001/insertarpadres`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos) //JSON.stringify me convierte de objeto a JSON
        })
        //Desarmo el JSON y pasa a ser un objeto
        let padres = await response.json()
        console.log(padres)
    for (i = 0; i < padres.length; i++){
        tabla += `<tr>
        <td>${padres[i].dni_padre}</td>
        <td>${padres[i].dni_madre}</td>
        <td>${padres[i].apellido_padre}</td>
        <td>${padres[i].apellido_madre}</td>
        </tr>`
    }
    document.getElementById("tabla").innerHTML = tabla;
}

// Punto 3
async function idsPadres() {
    let select = document.getElementById("eliminar").innerHTML
    response = await fetch('http://localhost:4001/padres',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let padres = await response.json()
    console.log(padres)
    for (i=0; i<padres.length;i++){
        select += `<option>${padres[i].dni_padre}</option>`
    }
    document.getElementById("eliminar").innerHTML = select;
} 

async function eliminarPadre(){
    const select = document.getElementById("eliminar");
    const dniSeleccionado = select.value;
    response = await fetch('http://localhost:4001/eliminarpadre',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dni_padre: dniSeleccionado })
    })
}

// Punto 4
async function idsPadres2() {
    let select = document.getElementById("cambiar").innerHTML
    response = await fetch('http://localhost:4001/padres',{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let padres = await response.json()
    console.log(padres)
    for (i=0; i<padres.length;i++){
        select += `<option>${padres[i].dni_padre}</option>`
    }
    document.getElementById("cambiar").innerHTML = select;
} 
async function cambiarDato(){
    const dniSeleccionado = document.getElementById("cambiar").value;
    const nuevoapellidopadre = document.getElementById("nuevoapellidopadre").value
    const datos2 = {
        dni_padre: dniSeleccionado,
        apellido_padre: nuevoapellidopadre,
    };
    response = await fetch('http://localhost:4001/modificarpadre',{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(datos2)
    })
    console.log("Hola")
}
function obtenerDatos(){
    let datos = {
        dni_padre: getDniPadre(),
        dni_madre: getDniMadre(),
        apellido_padre: getApellidopadre(),
        apellido_madre: getApellidomadre()
    }
    agregarPadre(datos)
}*/

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
    usuario_eliminar = (await result).json()
    alert("El usuario ha sido eliminado correctamente")
}

//Modificar juego
async function modificarJuego(modificar){
    let result = await fetch('http://localhost:4000/modificarjuego',{
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


