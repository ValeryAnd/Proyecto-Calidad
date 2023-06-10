const express = require('express');
const mysql = require('mysql2');
const app = express();

const path = require('path');

//URL ENCODER
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//INVOCAR A DOTENV
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//DIRECTORIO PUBLIC
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// INVOCAR BCRYPT
const bcryptjs = require('bcryptjs');

//VAR DE SESSION
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//INVOCAR AL MODULO DE CONEXION DE LA BD
const connection = require('./database/db');


//RUTAS

app.listen(8000, (req, res) => {
    console.log('Server running in localhost:8000');
})

//app.use(session({ secret: 'somevalue' })); 


//-----
app.post('/register', async (req, res) => {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const correo = req.body.email;
    const pass = req.body.password;
    const passwordHash = await bcryptjs.hash(pass, 8);
    const data = {message: 'Registro exitoso...',nombres: nombres, apellidos: apellidos, correo: correo, pass: passwordHash}
        
    connection.query('INSERT INTO users SET ?', {
        nombres: nombres,
        apellidos: apellidos,
        correo: correo,
        password: passwordHash
    }, async (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/login', async (req, res) => {
    const correo = req.body.email;
    const pass = req.body.password;

    if (correo && pass){
        connection.query('SELECT * FROM users WHERE correo = ?', correo, async(error, results)=>{
        if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].password))){
            res.status(400).send({message:"Usuario o contraseña incorrectos"})
        }else {
            res.status(201).send({message:"Login correcto"})
        }
        });
  }

    /*
    const data = {message: 'Login...', correo: correo, pass: pass}

    res.status(201).send(data)*/
})


