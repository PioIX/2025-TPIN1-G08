
async function checkLogIn(email, contraseña) {
  const users = await usuarios()
  for (let i = 0; i < users.length; i++){
      if (users[i].email == email) {
          if (users[i].password == contraseña) {
              idLogged = users[i].id_usuario
                if (users[i].isAdmin == true) {
                  idLogged = 1
                    return idLogged
                  }
              return idLogged
          } else {
              idLogged = 0
              return idLogged
          }
        
      } else {
        idLogged = -2
      }
    }
  return idLogged
}
async function logIn(){
    const email = getEmail();
    const password = getPassword();
        if (password == "" | email == ""){
      return alert("Por favor llena todos los espacios")
    }
    const idLogged = await checkLogIn(email, password)
    console.log(idLogged);
if(idLogged > 0){
  if(idLogged == 1){
    mostrarModal()
  }else{
    mostrarJuego()
  }
}else if(idLogged == -2){
  alert("El email no coincide")
}else {
  alert("la contraseña es incorrecta")
}
  }

async function registrarse(){
  const email = getEmail();
  const password = getPassword();
  if (password == "" | email == ""){
    return alert("Por favor llena todos los espacios")
  }
  const idLogged = await checkLogIn(email, password)
  console.log(idLogged);
  if(idLogged == -2){
    nuevosDatosUser()
    mostrarJuego()
  } else  {
    alert("El email ya ha sido utilizado")
  }
}


function newGame(){
    let datos = {
        game_name: getGameName(),
        cant_descargas: getCantDesc(),
        imagen: getImagen()
    }
    if(getGameName() == "" | getCantDesc() == ""){
        return alert("por favor llene las casillas de agregar juego, la imagen no es necesaria")
    }
    if(typeof getCantDesc() == "string"){
      return alert("por favor llene la casilla de cantidad de descargas con un numero")
  }
    if (!datos.imagen) {
        datos.imagen = "https://i.pinimg.com/736x/5d/e6/09/5de609b28d7230fb7669ff3810951873.jpg"
    }
    nuevoJuego(datos)
}

async function idJuego(){
    const games = await juegos();
    let id_juego = getIdJuegoEliminar();
    if (id_juego == "") {
        return alert("Por favor, complete la casilla de eliminar juego");
    }
    for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == id_juego) {
            await eliminarJuego(id_juego);
            return 1
        }
    }
    alert("El id no existe");
}


async function idUser(){
    const users = await usuarios()
    let id_user = getIdUser()
    if(id_user == ""){
        return alert("por favor llene la casilla de eliminar usuario")
    }
    for (let i = 0; i < users.length; i++){ 
      if (users[i].id_usuario == id_user) {
        await eliminarUsuario(id_user)
        return 1
    }
}
  alert("El id no existe")
}

function validarImagen(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);     // Imagen cargó bien
    img.onerror = () => resolve(false);   // Falló la carga
    img.src = url;
  });
}

async function cambiarJuego(){
  const games = await juegos();
  const imagenValida = await validarImagen(getModImg());
    let modificar ={  
        id_juego: idParaModificar,
        game_name: getModName(),
        cant_descargas: getModDownloads(),
        imagen: getModImg()
    }
    if (!modificar.game_name){
          modificar.game_name = games[idParaModificar - 1 ].game_name  
    }
    if (!modificar.cant_descargas){
          modificar.cant_descargas = games[idParaModificar - 1].cant_descargas  
    }
    if(!modificar.imagen) {
      modificar.imagen = games[idParaModificar - 1].imagen
    }else if (imagenValida == false) {
    alert("La URL de imagen no es válida. Se usará una imagen por defecto.");
    modificar.imagen = "https://i.pinimg.com/736x/5d/e6/09/5de609b28d7230fb7669ff3810951873.jpg";
  }
    modificarJuego(modificar)
  }
