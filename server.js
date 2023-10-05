const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql2023',
    database: 'bdvideojuegosmarlon'
});

db.connect((err) => {
    if(err) {
        console.error('Error de conexión a la base de datos:', err);
    }else{
        console.log('Conexión exitosa a la base de datos');
    }
});

// Configuración de CORS
app.use(cors());

// inportar y usar rutas CRUD
const crudRoutes = require('./routes/crudRoutes')(db); // Pasa la instancia de la base de datos a crudRoutes
app.use('/crud', crudRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend en funcionamiento en el puerto ${port}`);
});