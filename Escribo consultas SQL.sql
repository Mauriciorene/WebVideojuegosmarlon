/*Crear---------------------------------------------------------------------------------------*/ 

/*Crear un nuevo usuario*/
INSERT INTO Usuario (nombre, apellido, correo, telefono)
VALUES ('Mauricio', 'Rubio', 'rubiom831@gmail.com', '12345678');

/*Crear un nuevo cliente*/
INSERT INTO Cliente (nombre, apellido, telefono)
VALUES ('Byron', 'Efrain', '87654321');


/*Crear una nueva categoría*/
INSERT INTO Categoria (nombre)
VALUES ('Categoría Nueva');


/*Crear un nuevo producto*/
INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES (1, 'Descripción del producto', 'Nombre del Producto', 19.99, 100);


/*Realizar una nueva venta*/
INSERT INTO Venta (id_usuario, id_cliente, id_producto, fecha)
VALUES (1, 1, 1, '2023-10-04');


/*Leer--------------------------------------------------------------------------------------*/

/*Leer todos los usuarios*/
SELECT * FROM Usuario;

/*Leer todos los clientes*/
SELECT * FROM Cliente;

/*Leer todas las categorías*/
SELECT * FROM Categoria;

/*Leer todos los productos*/
SELECT * FROM Producto;

/*Leer todas las ventas*/
SELECT * FROM Venta;

/*Leer la Bitacora*/
SELECT * FROM bitacora;

/*Actualizar------------------------------------------------------------------------------*/

/*Actualizar un usuario existente*/
UPDATE Usuario
SET nombre = 'NuevoNombre', apellido = 'NuevoApellido'
WHERE id_Usuario = 1;

/*Actualizar un cliente existente*/
UPDATE Cliente
SET nombre = 'NuevoNombre', apellido = 'NuevoApellido'
WHERE id_cliente = 1;

/*Actualizar una categoría existente*/
UPDATE Categoria
SET nombre = 'NuevoNombre'
WHERE id_categoria = 1;

/*Actualizar un producto existente*/
UPDATE Producto
SET nombreProducto = 'NuevoNombre', precio = 29.99
WHERE id_producto = 1;

/*Actualizar una venta existente*/
UPDATE Venta
SET id_producto = 2
WHERE id_venta = 1;

/*Eliminar-------------------------------------------------------------------------------*/

/*Eliminar un usuario*/
DELETE FROM Usuario
WHERE id_Usuario = 1;

/*Eliminar un cliente*/
DELETE FROM Cliente
WHERE id_cliente = 1;

/*Eliminar una categoría*/
DELETE FROM Categoria
WHERE id_categoria = 1;

/*Eliminar un producto*/
DELETE FROM Producto
WHERE id_producto = 1;

/*Eliminar una venta*/
DELETE FROM Venta
WHERE id_venta = 1;
