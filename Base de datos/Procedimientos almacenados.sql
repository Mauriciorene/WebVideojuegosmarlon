/*Procedimientos para la tabla "Usuario"*/
/* Procedimiento almacenado para insertar un nuevo Usuario */
DELIMITER $
CREATE PROCEDURE InsertarUsuario (IN nombre VARCHAR(20), IN apellido VARCHAR(20), IN contraseña VARCHAR(8), IN Rol VARCHAR(20))
BEGIN
  INSERT INTO Usuario (nombre_Usuario, apellido, contraseña, Rol) 
  VALUES (nombre, apellido, contraseña, Rol);
END $
DELIMITER ;

/* Procedimiento almacenado para actualizar un registro de Usuario */
DELIMITER $
CREATE PROCEDURE ActualizarUsuario (IN id_Usuario INT, IN nombre VARCHAR(20), IN apellido VARCHAR(20), IN contraseña VARCHAR(8), IN Rol VARCHAR(20))
BEGIN
  UPDATE Usuario
  SET nombre_Usuario = nombre, apellido = apellido, contraseña = contraseña, Rol = Rol
  WHERE id_Usuario = id_Usuario;
END $
DELIMITER ;

/* Procedimiento almacenado para eliminar un registro de Usuario */
DELIMITER $
CREATE PROCEDURE EliminarUsuario (IN id_Usuario INT)
BEGIN
  DELETE FROM Usuario
  WHERE id_Usuario = id_Usuario;
END $
DELIMITER ;

/* Procedimiento almacenado para Mostrar un registro de Usuario */
DELIMITER $
CREATE PROCEDURE MostrarUsuarios()
BEGIN
  SELECT id_Usuario, nombre_Usuario, apellido, contraseña, Rol
  FROM Usuario;
END $
DELIMITER ;


/*Procedimientos almacenado para la tabla Cliente--------------------------------------------*/
/*Procedimiento almacenado para insertar un Cliente*/
DELIMITER $
CREATE PROCEDURE InsertarCliente (IN nombre VARCHAR(20), IN apellido VARCHAR(20), IN telefono VARCHAR(8))
BEGIN
  INSERT INTO Cliente (nombre, apellido, telefono) 
  VALUES (nombre, apellido, telefono);
END $
DELIMITER ;

/*Procedimiento almacenado para actualizar un registro de Cliente----------------------------*/
DELIMITER $
CREATE PROCEDURE ActualizarCliente (IN id_cliente INT, IN nombre VARCHAR(20), IN apellido VARCHAR(20), IN telefono VARCHAR(8))
BEGIN
  UPDATE Cliente
  SET nombre = nombre, apellido = apellido, telefono = telefono
  WHERE id_cliente = id_cliente;
END $
DELIMITER ;


/*Procedimiento almacenado para eliminar un registro de Cliente------------------------------*/
DELIMITER $
CREATE PROCEDURE EliminarCliente (IN id_cliente INT)
BEGIN
  DELETE FROM Cliente
  WHERE id_cliente = id_cliente;
END $
DELIMITER ;

/*Procedimiento almacenado para Mostrar un registro de Cliente*/
DELIMITER $
CREATE PROCEDURE MostrarClientes()
BEGIN
  SELECT id_cliente, nombre, apellido, telefono
  FROM Cliente;
END $
DELIMITER ;
 
/*Procedimientos almacenado para la tabla Categoria------------------------------------------*/

/*Procedimiento almacenado para insertar un registro de Categoria*/
DELIMITER $
CREATE PROCEDURE InsertarCategoria (IN nombre VARCHAR(30))
BEGIN
  INSERT INTO Categoria (nombre) 
  VALUES (nombre);
END $
DELIMITER ;

/*Procedimiento almacenado para actualizar un registro de Categoria--------------------------*/
DELIMITER $
CREATE PROCEDURE ActualizarCategoria (IN id_categoria INT, IN nombre VARCHAR(30))
BEGIN
  UPDATE Categoria
  SET nombre = nombre
  WHERE id_categoria = id_categoria;
END $
DELIMITER ;

/*Procedimiento almacenado para Eliminar un registro de Categoria----------------------------*/
DELIMITER $
CREATE PROCEDURE EliminarCategoria (IN id_categoria INT)
BEGIN
  DELETE FROM Categoria
  WHERE id_categoria = id_categoria;
END $
DELIMITER ;

/*Procedimiento almacenado para Mostrar un registro de Categoria-----------------------------*/
DELIMITER $
CREATE PROCEDURE MostrarCategorias()
BEGIN
  SELECT id_categoria, nombre
  FROM Categoria;
END $
DELIMITER ;

/*Procedimientos almacenado para la tabla Producto------------------------------------------*/

/*Procedimiento almacenado para insertar un registro de Producto*/
/* Procedimiento almacenado para insertar un registro de Producto sin imagen */
DELIMITER $
CREATE PROCEDURE InsertarProducto (IN id_categoria INT, IN descripcion VARCHAR(100), IN nombreProducto VARCHAR(30), IN precio FLOAT, IN Stock INT)
BEGIN
  INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock) 
  VALUES (id_categoria, descripcion, nombreProducto, precio, Stock);
END $
DELIMITER ;

/* Procedimiento almacenado para actualizar un registro de Producto ------------------------*/
DELIMITER $
CREATE PROCEDURE ActualizarProducto (IN id_producto INT, IN id_categoria INT, IN descripcion VARCHAR(100), IN nombreProducto VARCHAR(30), IN precio FLOAT, IN Stock INT, IN imagen LONGTEXT)
BEGIN
  UPDATE Producto
  SET id_categoria = id_categoria, descripcion = descripcion, nombreProducto = nombreProducto, precio = precio, Stock = Stock, imagen = imagen
  WHERE id_producto = id_producto;
END $
DELIMITER ;


/* Procedimiento almacenado para Eliminar un registro de Producto --------------------------*/
DELIMITER $
CREATE PROCEDURE EliminarProducto (IN id_producto INT)
BEGIN
  DELETE FROM Producto
  WHERE id_producto = id_producto;
END $
DELIMITER ;

/* Procedimiento almacenado para Mostrar un registro de Producto ---------------------------*/
DELIMITER $
CREATE PROCEDURE MostrarProductos()
BEGIN
  SELECT id_producto, id_categoria, descripcion, nombreProducto, precio, Stock, imagen
  FROM Producto;
END $
DELIMITER ;


/* Procedimiento Almacenado para Actualizar una Venta -------------------------------------*/

/* Procedimiento almacenado para insertar un registro de Venta */
DELIMITER $
CREATE PROCEDURE InsertarVenta (IN id_cliente INT, IN fecha DATE)
BEGIN
  INSERT INTO Venta (id_cliente, fecha) 
  VALUES (id_cliente, fecha);
END $
DELIMITER ;

/* Procedimiento almacenado para actualizar un registro de Venta */
DELIMITER $
CREATE PROCEDURE ActualizarVenta (IN id_venta INT, IN id_cliente INT, IN fecha DATE)
BEGIN
  UPDATE Venta
  SET id_cliente = id_cliente, fecha = fecha
  WHERE id_venta = id_venta;
END $
DELIMITER ;

/* Procedimiento almacenado para eliminar un registro de Venta */
DELIMITER $
CREATE PROCEDURE EliminarVenta (IN id_venta INT)
BEGIN
  DELETE FROM Venta
  WHERE id_venta = id_venta;
END $
DELIMITER ;

/* Procedimiento almacenado para mostrar registros de Venta */
DELIMITER $
CREATE PROCEDURE MostrarVentas()
BEGIN
  SELECT id_venta, id_cliente, fecha
  FROM Venta;
END $
DELIMITER ;

/* Procedimiento almacenado para insertar un registro de Detalle--------------------------------------------------- */
DELIMITER $
CREATE PROCEDURE InsertarDetalle (IN id_venta INT, IN id_producto INT, IN cantidad INT)
BEGIN
  INSERT INTO Detalle (id_venta, id_producto, cantidad) 
  VALUES (id_venta, id_producto, cantidad);
END $
DELIMITER ;

/* Procedimiento almacenado para actualizar un registro de Detalle */
DELIMITER $
CREATE PROCEDURE ActualizarDetalle (IN id_detalle INT, IN id_venta INT, IN id_producto INT, IN cantidad INT)
BEGIN
  UPDATE Detalle
  SET id_venta = id_venta, id_producto = id_producto, cantidad = cantidad
  WHERE id_detalle = id_detalle;
END $
DELIMITER ;

/* Procedimiento almacenado para eliminar un registro de Detalle */
DELIMITER $
CREATE PROCEDURE EliminarDetalle (IN id_detalle INT)
BEGIN
  DELETE FROM Detalle
  WHERE id_detalle = id_detalle;
END $
DELIMITER ;

/* Procedimiento almacenado para mostrar registros de Detalle */
DELIMITER $
CREATE PROCEDURE MostrarDetalles()
BEGIN
  SELECT id_detalle, id_venta, id_producto, cantidad
  FROM Detalle;
END $
DELIMITER ;

