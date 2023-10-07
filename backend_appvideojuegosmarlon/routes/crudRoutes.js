const express = require('express');
const router = express. Router();

module.exports = (db) => { 
    // Ruta para leer registros
    router.get('/read', (req, res) => {
     // Utiliza la instancia de la base de datos pasada como parámetro
     // Realizar una consulta SQL para seleccionar todos los registros
     const sql = 'SELECT * FROM city';
        
     // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros:', err);
        res.status(500).json({ error: 'Error al leer registros' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
        });
    });

      // Ruta para crear un nuevo registro con ID específico
    router.post('/create', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id, name, countrycode, district, population } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id || !name || !countrycode || !district || !population) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO city (ID, Name, CountryCode, District, Population) VALUES (?, ?, ?, ?, ?)`;
    const values = [id, name, countrycode, district, population];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
        console.error('Error al insertar registro:', err);
        res.status(500).json({ error: 'Error al insertar registro' });
        } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(201).json({ id });
        }
    });
    });

    // Ruta para actualizar un registro existente por ID
    router.put('/update/:id', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const id = req.params.id;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { name, countrycode, district, population } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!name || !countrycode || !district || !population) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
    UPDATE city
    SET Name = ?, CountryCode = ?, District = ?, Population = ?
    WHERE ID = ?
    `;

    const values = [name, countrycode, district, population, id];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
    if (err) {
        console.error('Error al actualizar el registro:', err);
        res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
    // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro actualizado con éxito' });
    }
    });
});

    // Ruta para eliminar un registro existente por ID
    router.delete('/delete/:id', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id = req.params.id;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM city WHERE ID = ?';

    // Ejecuta la consulta
    db.query(sql, [id], (err, result) => {
    if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
    // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
    });
});


    return router;
};