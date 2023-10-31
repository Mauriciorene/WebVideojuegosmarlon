/*Procedimientos para la tabla "Usuario"*/
-- Procedimiento Almacenado para Insertar un Nuevo Usuario
DELIMITER //
CREATE PROCEDURE InsertarUsuario(
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(20),
    IN p_correo VARCHAR(50),
    IN p_telefono VARCHAR(8),
    IN p_nombreUsuario VARCHAR(20),
    IN p_contraseña VARCHAR(10)
)
BEGIN
    INSERT INTO Usuario (nombre, apellido, correo, telefono, nombreUsuario, contraseña)
    VALUES (p_nombre, p_apellido, p_correo, p_telefono, p_nombreUsuario, p_contraseña);
END;
//DELIMITER ;


-- Procedimiento Almacenado para Actualizar un Usuario
DELIMITER //
CREATE PROCEDURE ActualizarUsuario(
    IN p_idUsuario INT,
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(20),
    IN p_correo VARCHAR(50),
    IN p_telefono VARCHAR(8),
    IN p_nombreUsuario VARCHAR(20),
    IN p_contraseña VARCHAR(10)
)
BEGIN
    UPDATE Usuario
    SET nombre = p_nombre, apellido = p_apellido, correo = p_correo, telefono = p_telefono, nombreUsuario = p_nombreUsuario, contraseña = p_contraseña
    WHERE id_Usuario = p_idUsuario;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Eliminar un Usuario
DELIMITER //
CREATE PROCEDURE EliminarUsuario(IN p_idUsuario INT)
BEGIN
    DELETE FROM Usuario WHERE id_Usuario = p_idUsuario;
END;
//DELIMITER ;


/*Procedimientos para la tabla "Cliente"*/

-- Procedimiento Almacenado para Insertar un Nuevo Cliente
DELIMITER //
CREATE PROCEDURE InsertarCliente(
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(20),
    IN p_telefono VARCHAR(8)
)
BEGIN
    INSERT INTO Cliente (nombre, apellido, telefono)
    VALUES (p_nombre, p_apellido, p_telefono);
END;
//DELIMITER ;

-- Procedimiento Almacenado para Actualizar un Cliente
DELIMITER //
CREATE PROCEDURE ActualizarCliente(
    IN p_idCliente INT,
    IN p_nombre VARCHAR(20),
    IN p_apellido VARCHAR(20),
    IN p_telefono VARCHAR(8)
)
BEGIN
    UPDATE Cliente
    SET nombre = p_nombre, apellido = p_apellido, telefono = p_telefono
    WHERE id_cliente = p_idCliente;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Eliminar un Cliente
DELIMITER //
CREATE PROCEDURE EliminarCliente(IN p_idCliente INT)
BEGIN
    DELETE FROM Cliente WHERE id_cliente = p_idCliente;
END;
//DELIMITER ;

 
/*Procedimientos para la tabla "Categoria"*/

-- Procedimiento Almacenado para Insertar una Nueva Categoría
DELIMITER //
CREATE PROCEDURE InsertarCategoria(
    IN p_nombre VARCHAR(30)
)
BEGIN
    INSERT INTO Categoria (nombre)
    VALUES (p_nombre);
END;
//DELIMITER ;

-- Procedimiento Almacenado para Actualizar una Categoría
DELIMITER //
CREATE PROCEDURE ActualizarCategoria(
    IN p_idCategoria INT,
    IN p_nombre VARCHAR(30)
)
BEGIN
    UPDATE Categoria
    SET nombre = p_nombre
    WHERE id_categoria = p_idCategoria;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Eliminar una Categoría
DELIMITER //
CREATE PROCEDURE EliminarCategoria(IN p_idCategoria INT)
BEGIN
    DELETE FROM Categoria WHERE id_categoria = p_idCategoria;
END;
//DELIMITER ;


/*Procedimientos para la tabla "Producto"*/

-- Procedimiento Almacenado para Insertar un Nuevo Producto
DELIMITER //
CREATE PROCEDURE InsertarProducto(
    IN p_idCategoria INT,
    IN p_descripcion VARCHAR(100),
    IN p_nombreProducto VARCHAR(30),
    IN p_precio FLOAT,
    IN p_Stock INT
)
BEGIN
    INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
    VALUES (p_idCategoria, p_descripcion, p_nombreProducto, p_precio, p_Stock);
END;
//DELIMITER ;

-- Procedimiento Almacenado para Actualizar un Producto
DELIMITER //
CREATE PROCEDURE ActualizarProducto(
    IN p_idProducto INT,
    IN p_idCategoria INT,
    IN p_descripcion VARCHAR(100),
    IN p_nombreProducto VARCHAR(30),
    IN p_precio FLOAT,
    IN p_Stock INT
)
BEGIN
    UPDATE Producto
    SET id_categoria = p_idCategoria, descripcion = p_descripcion, nombreProducto = p_nombreProducto,
        precio = p_precio, Stock = p_Stock
    WHERE id_producto = p_idProducto;
END;
//
DELIMITER ;

-- Procedimiento Almacenado para Eliminar un Producto
DELIMITER //
CREATE PROCEDURE EliminarProducto(IN p_idProducto INT)
BEGIN
    DELETE FROM Producto WHERE id_producto = p_idProducto;
END;
//DELIMITER ;


/*Procedimientos para la tabla "Venta"*/

-- Procedimiento Almacenado para insertar una Venta
DELIMITER //
CREATE PROCEDURE InsertarDetalleVenta(
    IN p_idVenta INT,
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precio FLOAT
)
BEGIN
    INSERT INTO Detalle (id_venta, id_producto, cantidad, precio)
    VALUES (p_idVenta, p_idProducto, p_cantidad, p_precio);

    -- Actualizar el stock en la tabla Producto
    UPDATE Producto
    SET Stock = Stock - p_cantidad
    WHERE id_producto = p_idProducto;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Actualizar una Venta 
DELIMITER //
CREATE PROCEDURE ActualizarDetalleVenta(
    IN p_numDetalle INT,
    IN p_idVenta INT,
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precio FLOAT
)
BEGIN
    -- Obtener la cantidad anterior del detalle
    DECLARE cantidad_anterior INT;
    SELECT cantidad INTO cantidad_anterior FROM Detalle WHERE num_detalle = p_numDetalle;

    -- Actualizar el detalle
    UPDATE Detalle
    SET id_venta = p_idVenta, id_producto = p_idProducto, cantidad = p_cantidad, precio = p_precio
    WHERE num_detalle = p_numDetalle;

    -- Actualizar el stock en la tabla Producto
    UPDATE Producto
    SET Stock = Stock + cantidad_anterior - p_cantidad
    WHERE id_producto = p_idProducto;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Eliminar una Venta --
DELIMITER //
CREATE PROCEDURE EliminarDetalleVenta(IN p_numDetalle INT)
BEGIN
    -- Obtener la cantidad del detalle que se va a eliminar
    DECLARE cantidad_a_eliminar INT;
    SELECT cantidad INTO cantidad_a_eliminar FROM Detalle WHERE num_detalle = p_numDetalle;

    -- Eliminar el detalle
    DELETE FROM Detalle WHERE num_detalle = p_numDetalle;

    -- Actualizar el stock en la tabla Producto
    UPDATE Producto
    SET Stock = Stock + cantidad_a_eliminar
    WHERE id_producto = (SELECT id_producto FROM Detalle WHERE num_detalle = p_numDetalle);
END;
//DELIMITER ;


/*Procedimientos para la tabla "Detalle"*/

-- Procedimiento Almacenado para Insertar un Detalle de Venta (Opcional)
DELIMITER //
CREATE PROCEDURE InsertarDetalleVenta(
    IN p_idVenta INT,
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precio FLOAT
)
BEGIN
    INSERT INTO Detalle (id_venta, id_producto, cantidad, precio)
    VALUES (p_idVenta, p_idProducto, p_cantidad, p_precio);

    -- Actualizar el stock en la tabla Producto
    UPDATE Producto
    SET Stock = Stock - p_cantidad
    WHERE id_producto = p_idProducto;
END;
//DELIMITER ;

-- Procedimiento Almacenado para Actualizar un Detalle de Venta (Opcional)
DELIMITER //
CREATE PROCEDURE ActualizarDetalleVenta(
    IN p_numDetalle INT,
    IN p_idVenta INT,
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precio FLOAT
)
BEGIN
    UPDATE Detalle
    SET id_venta = p_idVenta, id_producto = p_idProducto, cantidad = p_cantidad, precio = p_precio
    WHERE num_detalle = p_numDetalle;
    -- También puedes actualizar el stock en la tabla Producto si es necesario
END;
//
DELIMITER ;

-- Procedimiento Almacenado para Eliminar un Detalle de Venta (Opcional)
DELIMITER //
CREATE PROCEDURE EliminarDetalleVenta(IN p_numDetalle INT)
BEGIN
    DELETE FROM Detalle WHERE num_detalle = p_numDetalle;
    -- También puedes actualizar el stock en la tabla Producto si es necesario
END;
//
DELIMITER ;


/*Procedimiento para la tabla "Bitacora"*/

/* Procedimiento para la tabla "Bitacora" */
DELIMITER //
CREATE PROCEDURE RegistrarBitacora(
    IN p_transaccion VARCHAR(10),
    IN p_usuario VARCHAR(20),  -- Agregado: Identificación del usuario
    IN p_tabla VARCHAR(20)
)
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES (p_transaccion, p_usuario, NOW(), p_tabla);
END;
//DELIMITER ;