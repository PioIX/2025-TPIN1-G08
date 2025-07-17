var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res){
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});

//Pongo el servidor a escuchar
app.listen(port, function(){
    console.log(`Server running in http://localhost:${port}`);
});

app.get("/usuarios", async function(req, res) {
    let usuarios
    try {
        usuarios = await realizarQuery(`SELECT * FROM Usuarios`)
        res.send(usuarios)
    } catch (e) {
        res.send(e.message);
    }  
})

app.get('/juegos', async function(req, res){
    let juegos
    try{
        juegos = await realizarQuery(`SELECT * FROM Juegos`)
        res.send(juegos)
    } catch(error) {
        res.send(error)
    }
})

app.post('/insertuser', async function(req, res) {
    try {
        console.log(req.body);
        await realizarQuery(`
            INSERT INTO Usuarios (email, password, puntaje_max, isAdmin) VALUES
            ('${req.body.email}','${req.body.password}',${req.body.puntaje_max},${req.body.isAdmin}); 
        `);
        res.json({ mensaje: "Usuario agregado" });
    } catch (error) {
        res.send(error.message)
    }
});


app.post('/insertgame', async function(req, res) {
    try {
        console.log(req.body);
        await realizarQuery(`
            INSERT INTO Juegos (game_name, cant_descargas, imagen) VALUES
            ('${req.body.game_name}',${req.body.cant_descargas},'${req.body.imagen}'); 
        `);
        res.json({ mensaje: "Juego agregado" });
    } catch (error) {
        res.send(error.message)
    }
});

app.delete('/eliminarjuego', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            DELETE FROM Juegos WHERE id_juego = ${req.body.id_juego}
            `)
        res.json({mensaje :"Dato eliminado"})
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/eliminarusuario', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            DELETE FROM Usuarios WHERE id_usuario = ${req.body.id_usuario}
            `)
        res.json({mensaje :"Usuario eliminado"})
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/modificarjuego', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            UPDATE Juegos SET game_name = "${req.body.game_name}", cant_descargas = ${req.body.cant_descargas}, imagen = "${req.body.imagen}"  WHERE id_juego = ${req.body.id_juego}
            `)
        res.send("Dato modificado")
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/modificarpuntaje', async function (req, res){
    try {
        console.log(req.body)
        await realizarQuery(`
            UPDATE Usuarios SET puntaje_max = ${req.body.puntaje_max.puntajeActual} WHERE email = "${req.body.email}"
            `)
    } catch (error){
        res.send(error.message)
    }
})