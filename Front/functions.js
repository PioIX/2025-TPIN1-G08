let mailActual = null
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
    console.log("Id logueado: " + idLogged);
if(idLogged > 0){
  if(idLogged == 1){
    mostrarModal()
    mailActual = email
  }else{
    mostrarJuego()
    juegoAleatorio()
    mailActual = email
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
  if(idLogged == -2){
    await nuevosDatosUser()
    await mostrarJuego()
    juegoAleatorio()
    mailActual = email
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
    if(isNaN(Number(getCantDesc()))){ //Esto es para chequear que si no es un numero te salga el alert
      return alert("por favor llene la casilla de cantidad de descargas con un numero")
  }
    if (!datos.imagen) {
        datos.imagen = "https://i.pinimg.com/736x/5d/e6/09/5de609b28d7230fb7669ff3810951873.jpg"
    }
    nuevoJuego(datos)
}

async function idJuego(){
  await eliminarJuego(idJuegoE);
}

let idUserE = null
async function checkUser(){
  const users = await usuarios()
    idUserE = getIdUser()
    if(idUserE == ""){
        return alert("por favor llene la casilla de eliminar usuario")
    }
    for (let i = 0; i < users.length; i++){ 
      if (users[i].id_usuario == idUserE) {
        document.getElementById("id-usuario-actual").innerText = `ID: ${idUserE}`;
        document.getElementById("email-usuario-actual").innerText = `Mail: ${users[i].email}`;
        if(users[i].isAdmin == 0){
          document.getElementById("isAdmin-usuario-actual").innerText = `Estado: Jugador`;
        }else{
          document.getElementById("isAdmin-usuario-actual").innerText = `Estado: Administrador`;
        }
        document.getElementById("modal-eliminar-usuario").style.display = "block";
        return 1
    }
}
  alert("El id no existe")
}
let idJuegoE = null
async function checkJuego(){
  const games = await juegos();
    idJuegoE = getIdJuegoEliminar();
    if (idJuegoE == "") {
        return alert("Por favor, complete la casilla de eliminar juego");
    }
    for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == idJuegoE) {
          document.getElementById("id-juegoE").innerText = `ID: ${idJuegoE}`;
          document.getElementById("modal-eliminar-juego").style.display = "block";
          document.getElementById("nombre-juego").innerText = `${games[i].game_name}`;
            return 1
        }
    }
    alert("El id no existe");
}



async function idUser(){
  await eliminarUsuario(idUserE)
}

function validarImagen(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);     
    img.onerror = () => resolve(false);
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
      for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == idParaModificar) {
          modificar.game_name = games[i].game_name  
        }
    }
          
    }
    if (!modificar.cant_descargas){
      for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == idParaModificar) {
          modificar.cant_descargas = games[i].cant_descargas   
        } 
      }
    }

    if(!modificar.imagen) {
      for (let i = 0; i < games.length; i++) {
        if (games[i].id_juego == idParaModificar) {
          modificar.imagen = games[i].imagen   
        } 
      }
    }else if (imagenValida == false) {
      alert("La URL de imagen no es válida. Se usará una imagen por defecto.");
      modificar.imagen = "https://i.pinimg.com/736x/5d/e6/09/5de609b28d7230fb7669ff3810951873.jpg";
  }
    modificarJuego(modificar)
    checkearJuego()
  }

let puntajeActual = 0

  async function numeroAleatorioEntre(min, max) {
    const games = await juegos();
    numRand = Math.floor(Math.random() * (max - min + 1)) + min;
    while(!games[numRand]) {
      numRand = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return numRand
  }

async function juegoAleatorio() {
  const games = await juegos();
  let numeroRandom1 = await numeroAleatorioEntre(0, games[games.length -1].id_juego)
  let numeroRandom2 = await numeroAleatorioEntre(0, games[games.length -1].id_juego)
  while(numeroRandom1 == numeroRandom2){
    numeroRandom2 = await numeroAleatorioEntre(0, games[games.length -1].id_juego)
  }
  mostrarJuegos(numeroRandom1, numeroRandom2)
}

async function mostrarJuegos(numeroRandom1,numeroRandom2) {
  const games = await juegos();
  puntajeActual = 0
 for (let i = 0; i < games.length; i++) {
  if (games[i].id_juego == numeroRandom1) {
      imagen1 = games[i].imagen
      nombre1 = games[i].game_name
      cantDesc1 = formatearConPuntos(games[i].cant_descargas);

      
  }
}
for (let i = 0; i < games.length; i++) {
  if (games[i].id_juego == numeroRandom2) {
      imagen2 = games[i].imagen
      nombre2 = games[i].game_name
      cantDesc2 = formatearConPuntos(games[i].cant_descargas)
  }
}
document.getElementById('idEspacio1').style.display = 'flex'
document.getElementById('idEspacio2').style.display = 'flex'
document.getElementById('idEspacio3').style.display = 'flex'
document.getElementById('IdPuntajeActual').innerText = `${puntajeActual}`
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
  let numeroRand2 = await numeroAleatorioEntre(0, games[games.length -1].id_juego)
  while(document.getElementById('IdModNombrejuego1').innerText == `${games[numeroRand2].game_name}`){
    numeroRand2 = await numeroAleatorioEntre(0, games[games.length -1].id_juego)
  }
  document.getElementById('IdImagenJuego2').src = `${games[numeroRand2].imagen}`
  document.getElementById('IdModNombrejuego2').innerText = `${games[numeroRand2].game_name}`
  document.getElementById('idCantDescargas2').innerText = `${formatearConPuntos(games[numeroRand2].cant_descargas)} Descargas`

  document.getElementById('idCantDescargas2').style.display = 'none'
  document.getElementById('idEspacio1').style.display = 'flex'
  document.getElementById('idEspacio2').style.display = 'flex'
  document.getElementById('idEspacio3').style.display = 'flex'
  
}
async function mostrarDesc1(){ // si juego 1 tiene mas descargas
  const games = await juegos();
  document.getElementById('idCantDescargas2').style.display = 'flex'
  document.getElementById('idEspacio1').style.display = 'none'
  document.getElementById('idEspacio2').style.display = 'none'
  document.getElementById('idEspacio3').style.display = 'none'
  if (quitarPuntos(document.getElementById('idCantDescargas').innerText) >= quitarPuntos(document.getElementById('idCantDescargas2').innerText)) {
    document.getElementById("flechaRoja").onclick = null;
    document.getElementById("flechaVerde").onclick = null;
    puntajeActual += 1;
    document.getElementById('IdPuntajeActual').innerText = `${puntajeActual}`;
    if (quitarPuntos(document.getElementById('idCantDescargas').innerText) > quitarPuntos(document.getElementById('idCantDescargas2').innerText)){
    document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.flaticon.com/512/1709/1709977.png`
    document.getElementById('IdImagenRespuesta').style.display = 'flex'
    document.getElementById("idVs").style.display = "none";
    }else{
      document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.freepik.com/512/16322/16322571.png`
      document.getElementById('IdImagenRespuesta').style.display = 'flex'
      document.getElementById("idVs").style.display = "none";
    }
  setTimeout(() => {
    document.getElementById("flechaRoja").onclick = mostrarDesc1;
    document.getElementById("flechaVerde").onclick = mostrarDesc2;
    document.getElementById('idCantDescargas2').style.display = 'none';
    document.getElementById('IdImagenRespuesta').style.display = 'none';
    document.getElementById("idVs").style.display = "flex";
    continuarJuego();
  }, 2000); // 1000 milisegundos = 1 segundos

}else{
    const users = await usuarios();
    detenerMusica()
    audioIncorrecto()
    document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.flaticon.com/512/11379/11379029.png`
    document.getElementById('IdImagenRespuesta').style.display = 'flex'
    document.getElementById("idVs").style.display = "none";
    document.getElementById("flechaRoja").onclick = null;
    document.getElementById("flechaVerde").onclick = null;
     setTimeout(() => {
      document.getElementById("flechaRoja").onclick = mostrarDesc1;
      document.getElementById("flechaVerde").onclick = mostrarDesc2;
      document.getElementById("modalPerdiste").style.display = "flex";
      document.getElementById('IdPuntajeActual2').innerText = `Puntaje: ${puntajeActual}`
      document.getElementById('IdImagenRespuesta').style.display = 'none';
      document.getElementById("idVs").style.display = "flex";
      chequearPuntaje(users)
  }, 2000);
  }
}

function chequearPuntaje(users) {
    console.log("puntaje actual: " + puntajeActual)
    for (let i = 0; i < users.length; i++) {
    if (users[i].email == mailActual) {
      if (puntajeActual > users[i].puntaje_max){
        let puntajeNuevo = {
          puntajeActual: puntajeActual
        }
         modificarPuntaje(puntajeNuevo)
         document.getElementById('IdPuntajeMax').innerText = `Tu record: ${puntajeActual}`
      
      }
      else{
        document.getElementById('IdPuntajeMax').innerText = `Tu record: ${users[i].puntaje_max}`

      }
    }
    
   }
   puntajeActual = 0
}

async function mostrarDesc2(){ // si juego 2 tiene mas descargas
  const games = await juegos();
  document.getElementById('idCantDescargas2').style.display = 'flex'
  document.getElementById('idEspacio1').style.display = 'none'
  document.getElementById('idEspacio2').style.display = 'none'
  document.getElementById('idEspacio3').style.display = 'none'
  if (quitarPuntos(document.getElementById('idCantDescargas').innerText) <= quitarPuntos(document.getElementById('idCantDescargas2').innerText)){
    document.getElementById("flechaRoja").onclick = null;
    document.getElementById("flechaVerde").onclick = null;
    puntajeActual += 1;
    document.getElementById('IdPuntajeActual').innerText = `${puntajeActual}`;
    if (quitarPuntos(document.getElementById('idCantDescargas').innerText) < quitarPuntos(document.getElementById('idCantDescargas2').innerText)){
    document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.flaticon.com/512/1709/1709977.png`
    document.getElementById('IdImagenRespuesta').style.display = 'flex'
    document.getElementById("idVs").style.display = "none";
    
    }else{
      document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.freepik.com/512/16322/16322571.png`
      document.getElementById('IdImagenRespuesta').style.display = 'flex'
      document.getElementById("idVs").style.display = "none";
    }
    setTimeout(() => {
    document.getElementById("flechaRoja").onclick = mostrarDesc1;
    document.getElementById("flechaVerde").onclick = mostrarDesc2;
    document.getElementById('idCantDescargas2').style.display = 'none';
    document.getElementById('IdImagenRespuesta').style.display = 'none';
    document.getElementById("idVs").style.display = "flex";
    continuarJuego();
  }, 2000); // 1000 milisegundos = 1 segundos
  
  }else{
    const users = await usuarios();
    detenerMusica()
    audioIncorrecto()
    document.getElementById('IdImagenRespuesta').src = `https://cdn-icons-png.flaticon.com/512/11379/11379029.png`
    document.getElementById('IdImagenRespuesta').style.display = 'flex'
    document.getElementById("idVs").style.display = "none";
    document.getElementById("flechaRoja").onclick = null;
    document.getElementById("flechaVerde").onclick = null;
     setTimeout(() => {
      document.getElementById("flechaRoja").onclick = mostrarDesc1;
      document.getElementById("flechaVerde").onclick = mostrarDesc2;
      document.getElementById("modalPerdiste").style.display = "flex";
      document.getElementById('IdPuntajeActual2').innerText = `Puntaje: ${puntajeActual}`
      document.getElementById('IdImagenRespuesta').style.display = 'none';
      document.getElementById("idVs").style.display = "flex";
      chequearPuntaje(users)
  }, 2000);
  
  }
}
function iniciarMusica() {
  const audio = document.getElementById('audioFondo');
  audio.play().catch((e) => {
  });
}

function detenerMusica() {
  const audio = document.getElementById('audioFondo');
  audio.pause();
  audio.currentTime = 0;
}

function audioIncorrecto() {
  
  document.getElementById('audioIncorrecto').play();
}

function mutear(){
  document.getElementById('audioOn').classList.add('oculto');
  document.getElementById('audioOff').classList.remove('oculto');
  document.getElementById('audioIncorrecto').volume = 0.0
  document.getElementById('audioFondo').volume = 0.0
}

function playSound(){
  document.getElementById('audioOff').classList.add('oculto');
  document.getElementById('audioOn').classList.remove('oculto');
  document.getElementById('audioIncorrecto').volume = 0.2
  document.getElementById('audioFondo').volume = 0.2
}
document.getElementById('audioIncorrecto').volume = 0.2
document.getElementById('audioFondo').volume = 0.2
function divSonido(){
  document.getElementById('audioBoton').style.display = 'flex';
  
}

function formatearConPuntos(numero) {
  return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function quitarPuntos(cadenaConPuntos) {
  const sinPuntos = cadenaConPuntos.replace(/\./g, "");
  return parseInt(sinPuntos, 10);
}