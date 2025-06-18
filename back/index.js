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

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */
/*app.get('students', async function(req,res){
    try {
        let respuesta;
        if (req.query.id != undefined) {
            respuesta = await realizarQuery(`SELECT * FROM Juegos WHERE id=${req.query.id}`)
        } else {
            respuesta = await realizarQuery("SELECT * FROM Students");
            console.log(respuesta)
        }    
        res.send(respuesta);
    } catch (error) {
        res.send({mensaje:"Tuviste un error", error:error.message});
    }
})
app.post('/students',async function(req,res) {
        console.log(req.body) //Los pedidos post reciben los datos del req.body
        try {
            await realizarQuery(`
            INSERT INTO Students (id,FirstName,LastName,mail,id_grade) VALUES
                (${req.body.id},"${req.body.FirstName}","${req.body.LastName}","${req.body.mail}",${req.body.id_grade});
            `)
            //El back te convierte solito a JSON siempre y cuando mande un objeto
            res.send({respuesta: "Estudiante agregado"})
        } catch (error) {
            res.send({respuesta: "Tuviste un error: ", error:error.message})
        }
})


app.get('/padres', async function(req,res){
    let padres
    try {
        if (req.query.id != undefined)
            padres = await realizarQuery(`SELECT * FROM Padres WHERE id_padres=${req.query.id}`)
        else
            padres = await realizarQuery(`SELECT * FROM Padres`)
        res.send(padres)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/nacimientos', async function(req,res){
    let nacimientos
    try {
        if (req.query.id != undefined)
          nacimientos = await realizarQuery(`SELECT * FROM Nacimientos WHERE id_nacimientos=${req.query.id}`)
        else
          nacimientos = await realizarQuery(`SELECT * FROM Nacimientos`)
    res.send(nacimientos)
    } catch (error) {
    res.send(error.message)
    }
})

app.get('/bebes', async function(req,res){
    let bebes
    try {
        if (req.query.id != undefined)
            bebes = await realizarQuery(`SELECT * FROM Bebes WHERE dni_bebe=${req.query.id}`)
        else
            bebes = await realizarQuery(`SELECT * FROM Bebes`)
        res.send(bebes)
    } catch (error) {
        res.send(error.message)
    }
})

// Punto 4 y 7
app.post('/insertarpadres', async function(req, res) {
    try {
        console.log(req.body);
        const dni_padrecambiar = req.body.dni_padre
        const dni_padres = await realizarQuery(`SELECT * FROM Padres WHERE dni_padre = '${req.body.dni_padre}'`);
    
        if (dni_padres == dni_padrecambiar) {
            return res.send("Ya existe ese par de padres.");
        }
    
        await realizarQuery(`
            INSERT INTO Padres (dni_padre,dni_madre,apellido_padre,apellido_madre) VALUES
            (${req.body.dni_padre},${req.body.dni_madre},'${req.body.apellido_padre}','${req.body.apellido_madre}');
        `);
        res.json({ mensaje: "Padre agregado" });
    } catch (error) {
        res.send(error.message)
    }
});


app.post('/insertarbebe', async function(req, res) {
    try {
        console.log(req.body);
        const dni_bebescambiar = req.body.dni_bebe
        const dni_bebes = await realizarQuery(`SELECT * FROM Bebes WHERE dni_bebe = '${req.body.dni_bebe}'`);
    
        if (dni_bebes == dni_bebescambiar) {
            return res.send("Ya existe ese bebe");
        }
    
        await realizarQuery(`
            INSERT INTO Bebes ("nombre","apellido","dni_bebe","id_padres") VALUES
            ('${req.body.nombre}','${req.body.apellido}','${req.body.dni_bebe}','${req.body.id_padres}');
        `);
        res.send("Bebe agregado");
    } catch (error) {
        res.send(error.message)
    }
});

app.post('/insertarnacimiento', async function(req, res) {
    try {
        console.log(req.body);
        const dni_nacimientocambiar = req.body.dni_bebe
        const dni_bebes = await realizarQuery(`SELECT * FROM Nacimiento WHERE dni_bebe = '${req.body.dni_bebe}'`);
    
        if (dni_bebes == dni_nacimientocambiar) {
            return res.send("Ya existe ese nacimiento");
        }
    
        await realizarQuery(`
            INSERT INTO Nacimientos ("fecha_nacimiento","hora_nacimiento","dni_bebe") VALUES
            ('${req.body.fecha_nacimiento}','${req.body.hora_nacimiento}','${req.body.dni_bebe}');
        `);
        res.send("Nacimiento agregado");
    } catch (error) {
        res.send(error.message)
    }
});

// Punto 5

app.put('/modificarpadre', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            UPDATE Padres SET apellido_padre = "${req.body.apellido_padre}" WHERE dni_padre = ${req.body.dni_padre}
            `)
        res.json({ mensaje: "Dato modificado" });
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/modificarbebe', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            UPDATE Bebes SET nombre = "${req.body.nombre}" WHERE dni_bebe = ${req.body.dni_bebe}
            `)
        res.send("Dato modificado")
    } catch (error) {
        res.send(error.message)
    }
})

app.put('/modificarnacimiento', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            UPDATE Nacimientos SET fecha_nacimiento = "${req.body.fecha_nacimiento}" WHERE dni_bebe = ${req.body.dni_bebe}
            `)
        res.send("Dato modificado")
    } catch (error) {
        res.send(error.message)
    }
})

// Punto 6

app.delete('/eliminarpadre', async function(req,res){
    try {
        console.log(req.body)
        await realizarQuery (`
            DELETE FROM Padres WHERE dni_padre = ${req.body.dni_padre}
            `)
        res.json({ mensaje: "Dato eliminado" })
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/eliminarbebe', async function(req,res){
    try {
        console.log(body)
        await realizarQuery (`
            DELETE FROM Bebes WHERE dni_bebe = ${req.body.dni_bebe}
            `)
        req.send("Dato eliminado")
    } catch (error) {
        res.send(error.message)
    }
})

app.delete('/eliminarnacimiento', async function(req,res){
    try {
        console.log(body)
        await realizarQuery (`
            DELETE FROM Nacimiento WHERE dni_bebe = ${req.body.dni_bebe}
            `)
        req.send("Dato eliminado")
    } catch (error) {
        res.send(error.message)
    }
})*/
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