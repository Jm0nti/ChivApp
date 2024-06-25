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

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
