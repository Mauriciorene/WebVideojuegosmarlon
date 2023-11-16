const express = require('express');
const router = express. Router();

module.exports = (db) => { 

//Usuario en el Login---------------------------------------------------------------------------------------------------

// Ruta para verificar las credenciales y obtener el rol del usuario
router.post('/login', (req, res) => {
    const { nombre_Usuario, contraseña } = req.body;

    if (!nombre_Usuario || !contraseña) {
    return res.status(400).json({ error: 'Nombre de usuario y contraseña son obligatorios' });
    }

    // Realizar la consulta para verificar las credenciales en la base de datos
    const sql = `SELECT Rol FROM usuario WHERE nombre_Usuario = ? AND contraseña = ?`;
    db.query(sql, [nombre_Usuario, contraseña], (err, result) => {
    if (err) {
        console.error('Error al verificar credenciales:', err);
        return res.status(500).json({ error: 'Error al verificar credenciales' });
    }

    if (result.length === 1) {
        const { Rol } = result[0];
        res.json({ Rol }); // Devolver el rol si las credenciales son correctas
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    });
});

  //Cliente----------------------------------------------------------------------------------------------------------------
  //curl http://localhost:5000/crud/getClientes */

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

  //Sentencia 
  //curl http://localhost:5000/crud/readClientes
  //--------------------------------------------------------------------------------------


  // Ruta para crear un nuevo cliente
router.post('/createCliente', (req, res) => {
// Recibe los datos del nuevo cliente desde el cuerpo de la solicitud (req.body)
const { nombre, apellido, telefono, nombre_Usuario, contraseña, Rol } = req.body;

// Verifica si se proporcionaron los datos necesarios
if (!nombre || !apellido || !telefono || !nombre_Usuario || !contraseña || !Rol) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
}

// Realiza una consulta SQL para insertar un nuevo usuario
const sql = 'INSERT INTO Usuario (nombre_Usuario, contraseña, Rol) VALUES (?, ?, ?)';
const usuarioValues = [nombre_Usuario, contraseña, Rol];

db.query(sql, usuarioValues, (err, usuarioResult) => {
    if (err) {
    console.error('Error al insertar un usuario:', err);
    return res.status(500).json({ error: 'Error al insertar un usuario en la tabla Usuario' });
    }

    // Una vez que el usuario se ha insertado con éxito, obtenemos el ID del usuario creado
    const idUsuarioInsertado = usuarioResult.insertId;

    // Realiza una consulta SQL para insertar un nuevo cliente con el ID del usuario
    const insertClienteSQL = 'INSERT INTO Cliente (id_Usuario, nombre, apellido, telefono) VALUES (?, ?, ?, ?)';
    const clienteValues = [idUsuarioInsertado, nombre, apellido, telefono];

    db.query(insertClienteSQL, clienteValues, (err, clienteResult) => {
    if (err) {
        console.error('Error al insertar un cliente:', err);
        return res.status(500).json({ error: 'Error al insertar un cliente en la tabla Cliente' });
    }

    res.status(201).json({ message: 'Cliente agregado exitosamente' });
    });
});
});


  //Sentencia
  //curl -X POST -H "Content-Type: application/json" " http://localhost:5000/crud/createClientes
  //----------------------------------------------------------------------------------------

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

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" " http://localhost:5000/crud/updateClientes/1
  //-------------------------------------------------------------------------------------

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

  //Categoria----------------------------------------------------------------------------------------------------------------  
  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteCategoria/1
  //---------------------------------------------------------------------------------------

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

  //Sentencia
  //curl http://localhost:5000/crud/readCategoria

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

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" " http://localhost:5000/crud/createCategoria
  //----------------------------------------------------------------------------------------

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

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" " http://localhost:5000/crud/updateCategoria/1
  //-------------------------------------------------------------------------------------

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

  //Producto----------------------------------------------------------------------------------------------------------------  
  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteProducto
  //----------------------------------------------------------------------------------

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
    
  //Sentencia 
  //curl http://localhost:5000/crud/readProducto
  //--------------------------------------------------------------------------------------

    // Ruta para crear un nuevo producto
router.post('/createProducto', (req, res) => {
        // Recibe los datos del nuevo producto desde el cuerpo de la solicitud (req.body)
        const { id_categoria, descripcion, nombreProducto, precio, Stock, imagen } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!id_categoria || !descripcion || !nombreProducto || !precio || !Stock || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para insertar un nuevo producto
        const sql = `INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock, imagen) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [id_categoria, descripcion, nombreProducto, precio, Stock, imagen];
    
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

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" " http://localhost:5000/crud/createProducto
  //----------------------------------------------------------------------------------------

// Ruta para actualizar un producto
router.put('/updateProducto/:id_producto', (req, res) => {
        const id_producto = req.params.id_producto;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { id_categoria, descripcion, nombreProducto, precio, Stock, imagen } = req.body;
    
        // Verificar si los campos obligatorios están presentes en el cuerpo de la solicitud
        if (!id_categoria || !descripcion || !nombreProducto || !precio || !Stock || !imagen) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
    
        // Realiza la consulta SQL para actualizar el registro por ID
        const sql = `
        UPDATE Producto 
        SET id_categoria = ?, descripcion = ?, nombreProducto = ?, precio = ?, Stock = ?, imagen = ?
        WHERE id_producto = ?`;

        const values = [id_categoria, descripcion, nombreProducto, precio, Stock, imagen, id_producto];
    
        // Ejecuta la consulta
        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto en la tabla Producto' });
        } else {
            res.status(200).json({ message: 'Producto actualizado exitosamente' });
        }
    });
});

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" "http://localhost:5000/crud/updateProducto/1
  //-------------------------------------------------------------------------------------

    // Ruta para eliminar un producto
    router.delete('/deleteProducto/:id', (req, res) => {

        // Obtén el ID del registro a eliminar desde los parámetros de la URL
        const id = req.params.id;
    
        // Realiza la consulta SQL para eliminar el registro por ID
        const sql = `DELETE FROM Producto WHERE id_producto = ?`;
    
        // Ejecuta la consulta
        db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto de la tabla Producto' });
        } else {
            res.status(200).json({ message: 'Producto eliminado exitosamente' });
        }
    });
});
    

  //Venta----------------------------------------------------------------------------------------------------------------  
  //Sentencia
  //curl -X DELETE http://localhost:5000/crud/deleteVenta/1
  //---------------------------------------------------------------------------------------

    // Ruta para leer registros
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

  //Sentencia
  //curl http://localhost:5000/crud/readVenta
  //---------------------------------------------------------------------------------------------------------------------

//Venta------------------------------------------------------------------------------------------------------------------
// Ruta para registrar una venta con su detalle
    router.post('/createventa', (req, res) => {
        // Extraer datos de la solicitud
        const { id_cliente, fecha, detallesVenta } = req.body;
    
        // Verifica si se proporcionaron los datos necesarios
        if (!id_cliente || !fecha || !detallesVenta) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Realizar la inserción de la venta en la tabla venta
        const sqlPedido = 'INSERT INTO venta (id_cliente, fecha) VALUES (?, ?)';

        db.query(sqlPedido, [id_cliente, fecha], (err, result) => {
        if (err) {
            console.error('Error al insertar pedido:', err);
            return res.status(500).json({ error: 'Error al insertar venta' });
        }
    
        const id_venta = result.insertId; // Obtener el ID de la venta insertada
    
        // Iterar sobre el detalle de la venta y realizar inserciones en detalle
        const sqlDetalle = 'INSERT INTO detalle (id_venta, id_producto, cantidad) VALUES ?';
        const values = detallesVenta.map((item) => [id_venta, item.id_producto, item.cantidad]);
        db.query(sqlDetalle, [values], (err, result) => {
            if (err) {
            console.error('Error al insertar detalle del pedido:', err);
            return res.status(500).json({ error: 'Error al insertar detalle de la venta.' });
            }
    
            // Devolver respuesta exitosa
            res.status(201).json({ message: 'Pedido y detalle del pedido agregados con éxito' });
        });
        });
    });
    

  //Sentencia
  //curl -X POST -H "Content-Type: application/json" " http://localhost:5000/crud/createVenta
  //----------------------------------------------------------------------------------------


// Ruta para actualizar una registro existente por ID en la tabla venta
    router.put('/updateVenta/:idVenta', (req, res) => {
        // Obtén el ID del registro a actualizar desde los parámetros de la URL
        const idVenta = req.params.idVenta;

        // Recibe los datos actualizados desde el cuerpo de la solicitud (req.body)
        const { id_cliente, id_producto, cantidad, fecha } = req.body;


        // Verifica si se proporcionaron los datos necesarios    
        if (!id_cliente || !id_producto || !cantidad || !fecha) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Realiza la consulta SQL para actualizar el registro por ID    
        const sql = `
            UPDATE Venta
            SET id_cliente = ?, id_producto = ?, cantidad = ?, fecha = ?
            WHERE id_venta = ?
        `;

        const values = [id_cliente, id_producto, cantidad, fecha, idVenta];

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

  //Sentencia
  //curl -X PUT -H "Content-Type: application/json" " http://localhost:5000/crud/updateVenta/1
  //-------------------------------------------------------------------------------------

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

    return router;
};