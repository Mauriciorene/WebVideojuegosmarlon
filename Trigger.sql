/*Usuario--------------------------------------------------------------------------------------------*/

/*Cliente--------------------------------------------------------------------------------------------*/
-- Trigger para la tabla Cliente
-- Trigger para insertar en Cliente
DELIMITER //
CREATE TRIGGER TriggerInsertCliente
AFTER INSERT ON Cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'Cliente');
//
-- Insertar datos en la tabla Cliente
INSERT INTO Cliente (nombre, apellido, telefono)
VALUES ('Juan', 'Perez', '12345678');

-- Verificar si se activó el trigger
SELECT * FROM Bitacora;

-- Trigger para actualizar en Cliente
DELIMITER //
CREATE TRIGGER TriggerUpdateCliente
BEFORE UPDATE ON Cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'Cliente');
//

-- Trigger para eliminar en Cliente
DELIMITER //
CREATE TRIGGER TriggerDeleteCliente
AFTER DELETE ON Cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Cliente');
//

/*Categoría------------------------------------------------------------------------------------------*/
-- Triggers de la tabla Categoria
-- Trigger para insertar en Categoria
DELIMITER //
CREATE TRIGGER TriggerInsertCategoria
AFTER INSERT ON Categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'Categoria');
//
-- Insertar datos en la tabla Categoria
INSERT INTO Categoria (nombre)
VALUES ('Electrónicos');

-- Verificar si se activó el trigger
SELECT * FROM Bitacora;

-- Trigger para actualizar en Categoria
DELIMITER //
CREATE TRIGGER TriggerUpdateCategoria
BEFORE UPDATE ON Categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'Categoria');
//

-- Trigger para eliminar en Categoria
DELIMITER //
CREATE TRIGGER TriggerDeleteCategoria
AFTER DELETE ON Categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Categoria');
//

/*Producto-------------------------------------------------------------------------------------------*/
-- Trigger para la tabla Producto
-- Trigger para insertar en Producto
DELIMITER //
CREATE TRIGGER TriggerInsertProducto
AFTER INSERT ON Producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'Producto');
//
-- Insertar datos en la tabla Producto
INSERT INTO Producto (id_categoria, descripcion, nombreProducto, precio, Stock)
VALUES (1, 'Descripción del producto', 'Producto de Prueba', 10, 30);

-- Verificar si se activó el trigger
SELECT * FROM Bitacora;

-- Trigger para actualizar en Producto
DELIMITER //
CREATE TRIGGER TriggerUpdateProducto
BEFORE UPDATE ON Producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'Producto');
//

-- Trigger para eliminar en Producto
DELIMITER //
CREATE TRIGGER TriggerDeleteProducto
AFTER DELETE ON Producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Producto');
//

/*Venta----------------------------------------------------------------------------------------------*/
-- Trigger para la tabla Venta
-- Trigger para insertar en Venta
DELIMITER //
CREATE TRIGGER TriggerInsertVenta
AFTER INSERT ON Venta
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('INSERT', current_user(), NOW(), 'Venta');
//
-- Insertar datos en la tabla Venta (Asegúrate de tener los ID de cliente y producto existentes)
INSERT INTO Venta (id_cliente, id_producto, fecha)
VALUES (1, 1, NOW());

-- Verificar si se activó el trigger
SELECT * FROM Bitacora;


-- Trigger para actualizar en Venta
DELIMITER //
CREATE TRIGGER TriggerUpdateVenta
BEFORE UPDATE ON Venta
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('UPDATE', current_user(), NOW(), 'Venta');
//

-- Trigger para eliminar en Venta
DELIMITER //
CREATE TRIGGER TriggerDeleteVenta
AFTER DELETE ON Venta
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Venta');
//
