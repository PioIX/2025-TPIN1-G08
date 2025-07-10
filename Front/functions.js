
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
    modificarJuego(modificar )
    checkearJuego()
  }

  function numeroAleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

async function juegoAleatorio() {
  const games = await juegos();
  let numeroRandom1 = numeroAleatorioEntre(0, games.length -1)
  let numeroRandom2 = numeroAleatorioEntre(0, games.length -1)
  while(numeroRandom1 == numeroRandom2){
    numeroRandom2 = numeroAleatorioEntre(0, games.length -1)
  }
  console.log(numeroRandom1)
  console.log(numeroRandom2)
  mostrarJuegos(numeroRandom1, numeroRandom2)
}

async function mostrarJuegos(numeroRandom1,numeroRandom2) {
  const games = await juegos();
 for (let i = 0; i < games.length; i++) {
  if (games[i].id_juego == numeroRandom1) {
      imagen1 = games[i].imagen
      nombre1 = games[i].game_name
      cantDesc1 = games[i].cant_descargas
  }
}
for (let i = 0; i < games.length; i++) {
  if (games[i].id_juego == numeroRandom2) {
      imagen2 = games[i].imagen
      nombre2 = games[i].game_name
      cantDesc2 = games[i].cant_descargas
  }
}
document.getElementById('IdImagenJuego1').src = `${imagen1}`
document.getElementById('IdImagenJuego2').src = `${imagen2}`
document.getElementById('IdModNombrejuego1').innerText = `${nombre1}`
document.getElementById('IdModNombrejuego2').innerText = `${nombre2}`
document.getElementById('idCantDescargas').innerText = `${cantDesc1} Descargas`
document.getElementById('idCantDescargas2').innerText = `${cantDesc2} Descargas`
}


async function continuarJuego() {
  const games = await juegos();
  document.getElementById('IdImagenJuego1').src = `${document.getElementById('IdImagenJuego2').src}`
  document.getElementById('IdModNombrejuego1').innerText = `${document.getElementById('IdModNombrejuego2').innerText}`
  document.getElementById('idCantDescargas').innerText = `${document.getElementById('idCantDescargas2').innerText}`
  let numeroRand2 = numeroAleatorioEntre(0, games.length -1)
  console.log(numeroRand2)
  console.log(document.getElementById('IdModNombrejuego1').innerText)
  while(document.getElementById('IdModNombrejuego1').innerText == `${games[numeroRand2].game_name}`){
    numeroRand2 = numeroAleatorioEntre(0, games.length -1)
  }
  document.getElementById('IdImagenJuego2').src = `${games[numeroRand2].imagen}`
  document.getElementById('IdModNombrejuego2').innerText = `${games[numeroRand2].game_name}`
  document.getElementById('idCantDescargas2').innerText = `${games[numeroRand2].cant_descargas} Descargas`

  document.getElementById('idCantDescargas2').style.display = 'none'
  
}
async function mostrarDesc1(){ //juego 1 tiene mas descargas
  const games = await juegos();
  document.getElementById('idCantDescargas2').style.display = 'flex'
  if (document.getElementById('idCantDescargas').innerText >= document.getElementById('idCantDescargas2').innerText){
    continuarJuego() // hacer q esta funcion tarde en ejecutarse unos segs
  }else{
    // hacer q salga un modal q diga "perdiste", que tenga una puntuacion max del jugador y la puntuacion q se saco en esta partida y un boton de volver a jugar
  }
}

async function mostrarDesc2(){ //juego 2 tiene mas descargas
  const games = await juegos();
  document.getElementById('idCantDescargas2').style.display = 'flex'
  if (document.getElementById('idCantDescargas').innerText <= document.getElementById('idCantDescargas2').innerText){
    continuarJuego() // hacer q esta funcion tarde en ejecutarse unos segs
  }else{
    // hacer q salga un modal q diga "perdiste", que tenga una puntuacion max del jugador y la puntuacion q se saco en esta partida y un boton de volver a jugar
  }
}
