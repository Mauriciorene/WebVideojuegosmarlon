const express = require('express');
const router = express. Router();

module.exports = (db) => { 

//Cliente----------------------------------------------------------------------------------------------------------------
  /*   curl http://localhost:5000/crud/getClientes */


    // Ruta para obtener todos los clientes
router.get('/getClientes', (req, res) => {
    // Realiza la consulta SQL para obtener todos los clientes
    const sql = `SELECT * FROM Cliente`;

    // Ejecuta la consulta
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            res.status(500).json({ error: 'Error al obtener clientes de la tabla Cliente' });
        } else {
            // Devuelve los resultados como respuesta
            res.status(200).json(results);
        }
    });
});

// Ruta para crear un nuevo cliente
router.post('/createCliente', (req, res) => {
    // Recibe los datos del nuevo cliente desde el cuerpo de la solicitud (req.body)
    const { nombre, apellido, telefono } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Los campos "nombre" y "apellido" son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo cliente
    const sql = `INSERT INTO Cliente (nombre, apellido, telefono) VALUES (?, ?, ?)`;
    const values = [nombre, apellido, telefono];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar un cliente:', err);
            res.status(500).json({ error: 'Error al insertar un cliente en la tabla Cliente' });
        } else {
            // Devuelve un mensaje como respuesta
            res.status(201).json({ message: 'Cliente agregado exitosamente' });
        }
    });
});

// Ruta para actualizar un cliente
router.put('/updateCliente/:id', (req, res) => {
        const id_cliente = req.params.id;
        const { nombre, apellido, telefono } = req.body;
    
        // Verificar si los campos obligatorios (nombre y apellido) están presentes en el cuerpo de la solicitud
        if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Los campos "nombre" y "apellido" son obligatorios' });
        }
    
        const sql = `UPDATE Cliente SET nombre = ?, apellido = ?, telefono = ? WHERE id_cliente = ?`;
        const values = [nombre, apellido, telefono, id_cliente];
    
        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el cliente:', err);
            res.status(500).json({ error: 'Error al actualizar el cliente en la tabla Cliente' });
        } else {
            res.status(200).json({ message: 'Cliente actualizado exitosamente' });
        }
    });
});


    
  // Ruta para eliminar un cliente
router.delete('/deleteCliente/:id', (req, res) => {
    const id = req.params.id;
    
    const sql = `DELETE FROM cliente WHERE id_cliente = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) {
        console.error('Error al eliminar el cliente:', err);
        res.status(500).json({ error: 'Error al eliminar el cliente de la tabla Cliente' });
        } else {
        res.status(200).json({ message: 'Cliente eliminado exitosamente' });
        }
    });
    });
    


//Usuario en el Login---------------------------------------------------------------------------------------------------

// Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
        const { nombre_Usuario, apellido, contrasena } = req.body;
    
        if (!nombre_Usuario || !apellido || !contrasena) {
        return res.status(400).json({ error: 'Nombre de usuario, apellido y contraseña son obligatorios' });
        }
    
        // Realizar la consulta para verificar las credenciales en la base de datos
        const sql = `SELECT rol FROM Usuario WHERE nombre_Usuario = ? AND apellido = ? AND contrasena = ?`;
        db.query(sql, [nombre_Usuario, apellido, contrasena], (err, result) => {
        if (err) {
            console.error('Error al verificar credenciales:', err);
            return res.status(500).json({ error: 'Error al verificar credenciales' });
        }
    
        if (result.length === 1) {
            const { rol } = result[0];
            res.json({ rol }); // Devolver el rol si las credenciales son correctas
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
        });
    });

    


  // Ruta para leer registros
    // Ruta para leer registros
    router.get('/readCategoria', (req, res) => {
     // Utiliza la instancia de la base de datos pasada como parámetro
     // Realizar una consulta SQL para seleccionar todos los registros
     const sql = 'SELECT * FROM categoria';
        
     // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros de la tabla categoria:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla categoria' });
        } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
        });
    });


    //Categoria----------------------------------------------------------------------------------------------------------
      // Ruta para crear un nuevo registro con ID específico en la tabla Categoria
    router.post('/createCategoria', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { nombre } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!nombre) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Categoria (nombre) VALUES (?)`;
    const values = [nombre];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
        console.error('Error al insertar registro en la tabla categoria:', err);
        res.status(500).json({ error: 'Error al insertar registro en la tabla categoria' });
        } else {
        // Devuelve el ID del nuevo registro como respuesta
        res.status(200).json({ message: 'Registro agregado exitosamente' });
        }
    });
    });

        // Ruta para actualizar un registro existente por ID
    router.put('/updateCategoria/:id_categoria', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const id_categoria = req.params.id_categoria;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { nombre } = req.body;

        // Verifica si se proporcionaron los datos necesarios
        if (!nombre) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
        UPDATE categoria
        SET nombre = ?
        WHERE id_categoria = ?
        `;

        const values = [nombre, id_categoria];

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


    // Ruta para eliminar un registro existente por ID en la tabla Categoria
    router.delete('/deleteCategoria/:id_categoria', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const id_categoria = req.params.id_categoria;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM categoria WHERE id_categoria = ?';

    // Ejecuta la consulta
    db.query(sql, [id_categoria], (err, result) => {
    if (err) {
        console.error('Error al eliminar el registro:', err);
        res.status(500).json({ error: 'Error al eliminar el registro de la tabla Categoria' });
    } else {
    // Devuelve un mensaje de éxito
        res.status(200).json({ message: 'Registro eliminado con éxito' });
    }
    });
});

// Ruta para leer registros //
//Ruta para leer la tabla producto de la Base de Datos--------------------------------
    router.get('/readproducto', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Producto';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
        console.error('Error al leer registros de la tabla categotia:', err);
        res.status(500).json({ error: 'Error al leer registros de la tabla Categoria' });
    } else {
        // Devolver los registros en formato JSON como respuesta
        res.status(200).json(result);
        }
    });
});


//Producto----------------------------------------------------------------------------------------------------------------
/* curl http://localhost:5000/crud/getProducto   */

// Ruta para obtener todos los productos
router.get('/readProducto', (req, res) => {
        // Realiza la consulta SQL para obtener todos los productos
        const sql = `SELECT * FROM Producto`;
    
        // Ejecuta la consulta
        db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos de la tabla Producto' });
        } else {
            // Devuelve los resultados como respuesta
            res.status(200).json(results);
        }
    });
});
    
    // Ruta para crear un nuevo producto
router.post('/createProducto', (req, res) => {
        // Recibe los datos del nuevo producto desde el cuerpo de la solicitud (req.body)
        const { id_categoria, descripcion, nombreProducto, precio, Stock } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!id_categoria || !descripcion || !nombreProducto || !precio || !Stock) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo producto
        const sql = `INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock) VALUES (?, ?, ?, ?, ?)`;
        const values = [id_categoria, descripcion, nombreProducto, precio, Stock];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar un producto:', err);
            res.status(500).json({ error: 'Error al insertar un producto en la tabla Producto' });
        } else {
            // Devuelve un mensaje como respuesta
            res.status(201).json({ message: 'Producto agregado exitosamente' });
        }
    });
});
    
    // Ruta para actualizar un producto
router.put('/updateProducto/:id_producto', (req, res) => {
        const id_producto = req.params.id_producto;
        const { id_categoria, descripcion, nombreProducto, precio, Stock } = req.body;
    
        // Verificar si los campos obligatorios están presentes en el cuerpo de la solicitud
        if (!id_categoria || !descripcion || !nombreProducto || !precio || !Stock) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        const sql = `UPDATE Producto 
        SET id_categoria = ?, descripcion = ?, nombreProducto = ?, precio = ?, Stock = ? 
        WHERE id_producto = ?`;
        const values = [id_categoria, descripcion, nombreProducto, precio, Stock, id_producto];
    
        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto en la tabla Producto' });
        } else {
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        }
    });
});
    
    // Ruta para eliminar un producto
    router.delete('/deleteProducto/:id', (req, res) => {
        const id = req.params.id;
    
        const sql = `DELETE FROM Producto WHERE id_producto = ?`;
    
        db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto de la tabla Producto' });
        } else {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        }
    });
});
    


// Ruta para leer registros de la tabla Venta
router.get('/readVenta', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Venta';

   // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros de la tabla Venta:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla Venta' });
        } else {
        // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
        }
    });
});


//Venta------------------------------------------------------------------------------------------------------------------
  // Ruta para crear un nuevo registro con ID específico en la tabla venta
router.post('/createVenta', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id_usuario, nombreCliente, id_producto, fecha } = req.body;

    if (!id_usuario || !nombreCliente || !id_producto || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Venta (id_usuario, nombreCliente, id_producto, fecha) VALUES (?, ?, ?, ?)`;
    const values = [id_usuario, nombreCliente, id_producto, fecha];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar un registro en la tabla Venta:', err);
            res.status(500).json({ error: 'Error al insertar un registro en la tabla Venta' });
        } else {
        // Devuelve un mensaje como respuesta
            res.status(201).json({ message: 'Registro agregado con éxito' });
        }
    });
});

// Ruta para actualizar una registro existente por ID en la tabla venta
router.put('/updateVenta/:idVenta', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const idVenta = req.params.idVenta;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { id_usuario, nombreCliente, id_producto, fecha } = req.body;


    // Verifica si se proporcionaron los datos necesarios    
    if (!id_usuario || !nombreCliente || !id_producto || !fecha) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID    
    const sql = `
        UPDATE Venta
        SET id_usuario = ?, nombreCliente = ?, id_producto = ?, fecha = ?
        WHERE id_venta = ?
    `;

    const values = [id_usuario, nombreCliente, id_producto, fecha, idVenta];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar la venta:', err);
            res.status(500).json({ error: 'Error al actualizar la venta' });
        } else {
        // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro actualizada exitosamente' });
        }
    });
});

// Ruta para eliminar una venta existente por ID en la tabla Venta
router.delete('/deleteVenta/:idVenta', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const idVenta = req.params.idVenta;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM Venta WHERE id_venta = ?';

    // Ejecuta la consulta
    db.query(sql, [idVenta], (err, result) => {
        if (err) {
            console.error('Error al eliminar un registro de la tabla Venta:', err);
            res.status(500).json({ error: 'Error al eliminar un registro de la tabla Venta' });
        } else {
        // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro eliminada exitosamente' });
        }
    });
});


//Detalle----------------------------------------------------------------------------------------------------------------
// Ruta para leer registros de la tabla Detalle
router.get('/readDetalle', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Detalle';

    // Ejecutar la consulta
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros de la tabla Detalle:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla Detalle' });
        } else {
        // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
        }
    });
});

// Ruta para crear un nuevo detalle
router.post('/createDetalle', (req, res) => {
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { id_venta, id_producto, cantidad, precio } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id_venta || !id_producto || !cantidad || !precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Detalle (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)`;
    const values = [id_venta, id_producto, cantidad, precio];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar un detalle:', err);
            res.status(500).json({ error: 'Error al insertar un registro en la tabla Detalle' });
        } else {
        // Devuelve un mensaje como respuesta
            res.status(201).json({ message: 'Registro agregado exitosamente' });
        }
    });
});

// Ruta para actualizar un detalle existente por número de detalle
router.put('/updateDetalle/:numDetalle', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const numDetalle = req.params.numDetalle;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { id_venta, id_producto, cantidad, precio } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!id_venta || !id_producto || !cantidad || !precio) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
        UPDATE Detalle
        SET id_venta = ?, id_producto = ?, cantidad = ?, precio = ?
        WHERE num_detalle = ?
    `;

    const values = [id_venta, id_producto, cantidad, precio, numDetalle];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar un registro de la tabla Detalle:', err);
            res.status(500).json({ error: 'Error al actualizar un registro dela tabla Detalle' });
        } else {
        // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro actualizado exitosamente' });
        }
    });
});

// Ruta para eliminar un detalle existente por ID en la tabla Detalle
router.delete('/deleteDetalle/:numDetalle', (req, res) => {
    // Obtén el ID del registro a eliminar desde los parámetros de la URL
    const numDetalle = req.params.numDetalle;

    // Realiza la consulta SQL para eliminar el registro por ID
    const sql = 'DELETE FROM Detalle WHERE num_detalle = ?';

    // Ejecuta la consulta
    db.query(sql, [numDetalle], (err, result) => {
        if (err) {
            console.error('Error al eliminar un registro de la tabla Detalle:', err);
            res.status(500).json({ error: 'Error al eliminar un un registro de la tabla Detalle' });
        } else {
        // Devuelve un mensaje de éxito
            res.status(200).json({ message: 'Registro eliminado exitosamente' });
        }
    });
});


// Ruta para leer registros //
// Ruta para leer registros de la tabla Bitácora
router.get('/readBitacora', (req, res) => {
    // Utiliza la instancia de la base de datos pasada como parámetro
    // Realizar una consulta SQL para seleccionar todos los registros
    const sql = 'SELECT * FROM Bitacora';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al leer registros de la tabla Bitácora:', err);
            res.status(500).json({ error: 'Error al leer registros de la tabla Bitácora' });
        } else {
        // Devolver los registros en formato JSON como respuesta
            res.status(200).json(result);
        }
    });
});


//Bitácora-----------------------------------------------------------------------------------------------------------------
// Ruta para crear un nuevo registro en la Bitácora
router.post('/createBitacora', (req, res) => {
    
    // Verifica si se proporcionaron los datos necesarios
    // Recibe los datos del nuevo registro desde el cuerpo de la solicitud (req.body)
    const { evento, fecha_hora } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!evento || !fecha_hora) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para insertar un nuevo registro con ID específico
    const sql = `INSERT INTO Bitacora (evento, fecha_hora) VALUES (?, ?)`;
    const values = [evento, fecha_hora];

    // Ejecuta la consulta
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar un registro en la Bitácora:', err);
            res.status(500).json({ error: 'Error al insertar un registro en la Bitácora' });
        } else {
        // Devuelve un mensaje como respuesta
            res.status(201).json({ message: 'Registro de Bitácora agregado exitosamente' });
        }
    });
});

// Ruta para actualizar un registro de la Bitácora existente por ID de Bitácora
router.put('/updateBitacora/:idBitacora', (req, res) => {
    // Obtén el ID del registro a actualizar desde los parámetros de la URL
    const idBitacora = req.params.idBitacora;

    // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
    const { evento, fecha_hora } = req.body;

    // Verifica si se proporcionaron los datos necesarios
    if (!evento || !fecha_hora) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Realiza la consulta SQL para actualizar el registro por ID
    const sql = `
        UPDATE Bitacora
        SET evento = ?, fecha_hora = ?
        WHERE id_bitacora = ?
    `;

    const values = [evento, fecha_hora, idBitacora];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el registro de Bitácora:', err);
            res.status(500).json({ error: 'Error al actualizar el registro de Bitácora' });
        } else {
            res.status(200).json({ message: 'Registro de Bitácora actualizado exitosamente' });
        }
    });
});

// Ruta para eliminar un registro de la Bitácora existente por ID de Bitácora
router.delete('/deleteBitacora/:idBitacora', (req, res) => {
    const idBitacora = req.params.idBitacora;

    const sql = 'DELETE FROM Bitacora WHERE id_bitacora = ?';

    db.query(sql, [idBitacora], (err, result) => {
        if (err) {
            console.error('Error al eliminar un registro de Bitácora:', err);
            res.status(500).json({ error: 'Error al eliminar un registro de Bitácora' });
        } else {
            res.status(200).json({ message: 'Registro de Bitácora eliminado exitosamente' });
        }
    });
});



    return router;
};