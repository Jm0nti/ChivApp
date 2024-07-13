const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear cuerpos de solicitudes JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)));

// Ruta archivo json
app.get('/credenciales.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'credenciales.json'));
});

// Actualizacion de credenciales, agregar usuario
app.post('/agregar-usuario', (req, res) => {
    const nuevoUsuario = req.body;

    fs.readFile('credenciales.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }

        const jsonData = JSON.parse(data);
        jsonData.usuarios.push(nuevoUsuario);

        fs.writeFile('credenciales.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error al escribir en el archivo JSON');
                return;
            }

            res.status(200).send('Usuario agregado correctamente');
        });
    });
});

// Ruta archivo chivas.json
app.get('/chivas.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'chivas.json'));
});

// Actualizacion de chivas, agregar chiva
app.post('/agregar-chiva', (req, res) => {
    const nuevoChiva = req.body;

    fs.readFile('chivas.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }

        const jsonData = JSON.parse(data);

        if (!jsonData.Chivas) {
            jsonData.Chivas = [];
        }

        jsonData.Chivas.push(nuevoChiva);

        fs.writeFile('chivas.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error al escribir en el archivo JSON');
                return;
            }

            res.status(200).send('Chiva agregado correctamente');
        });
    });
});

// Ruta archivo placas.json
app.get('/placas.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'placas.json'));
});

// Guardar solo la placa
app.post('/guardar-placa', (req, res) => {
    const nuevaPlaca = req.body;

    fs.readFile('placas.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo JSON');
            return;
        }

        const jsonData = JSON.parse(data);

        if (!jsonData.placas) {
            jsonData.placas = [];
        }

        jsonData.placas.push(nuevaPlaca.placa);

        fs.writeFile('placas.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error al escribir en el archivo JSON');
                return;
            }

            res.status(200).send('Placa guardada correctamente');
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
