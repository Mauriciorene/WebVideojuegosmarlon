/*Usuario--------------------------------------------------------------------------------------------*/
DELIMITER //
-- Trigger para la tabla 'Usuario' (Inserción)
DROP TRIGGER IF EXISTS tr_usuario_insert;
CREATE TRIGGER tr_usuario_insert
AFTER INSERT ON Usuario
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Inserción', current_user(), NOW(), 'Usuario');
END;
//
DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Usuario' (Actualización)
DROP TRIGGER IF EXISTS tr_usuario_update;
CREATE TRIGGER tr_usuario_update
AFTER UPDATE ON Usuario
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Actualización', current_user(), NOW(), 'Usuario');
END;
//DELIMITER //

/*Cliente--------------------------------------------------------------------------------------------*/

DELIMITER //
-- Trigger para la tabla 'Cliente' (Inserción)
DROP TRIGGER IF EXISTS tr_cliente_insert;
CREATE TRIGGER tr_cliente_insert
AFTER INSERT ON Cliente
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Inserción', current_user(), NOW(), 'Cliente');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Cliente' (Actualización)
DROP TRIGGER IF EXISTS tr_cliente_update;
CREATE TRIGGER tr_cliente_update
AFTER UPDATE ON Cliente
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Actualización', current_user(), NOW(), 'Cliente');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Cliente' (Eliminación)
DROP TRIGGER IF EXISTS tr_cliente_delete;
CREATE TRIGGER tr_cliente_delete
AFTER DELETE ON Cliente
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Eliminación', current_user(), NOW(), 'Cliente');
END;
//DELIMITER //

/*Categoría------------------------------------------------------------------------------------------*/

DELIMITER //
-- Trigger para la tabla 'Categoria' (Inserción)
DROP TRIGGER IF EXISTS tr_categoria_insert;
CREATE TRIGGER tr_categoria_insert
AFTER INSERT ON Categoria
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Inserción', current_user(), NOW(), 'Categoria');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Categoria' (Actualización)
DROP TRIGGER IF EXISTS tr_categoria_update;
CREATE TRIGGER tr_categoria_update
AFTER UPDATE ON Categoria
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Actualización', current_user(), NOW(), 'Categoria');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Categoria' (Eliminación)
DROP TRIGGER IF EXISTS tr_categoria_delete;
CREATE TRIGGER tr_categoria_delete
AFTER DELETE ON Categoria
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Eliminación', current_user(), NOW(), 'Categoria');
END;
//DELIMITER //

/*Producto-------------------------------------------------------------------------------------------*/

DELIMITER //
-- Trigger para la tabla 'Producto' (Inserción)
DROP TRIGGER IF EXISTS tr_producto_insert;
CREATE TRIGGER tr_producto_insert
AFTER INSERT ON Producto
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Inserción', current_user(), NOW(), 'Producto');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Producto' (Actualización)
DROP TRIGGER IF EXISTS tr_producto_update;
CREATE TRIGGER tr_producto_update
AFTER UPDATE ON Producto
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Actualización', current_user(), NOW(), 'Producto');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Producto' (Eliminación)
DROP TRIGGER IF EXISTS tr_producto_delete;
CREATE TRIGGER tr_producto_delete
AFTER DELETE ON Producto
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Eliminación', current_user(), NOW(), 'Producto');
END;
//DELIMITER //

/*Venta----------------------------------------------------------------------------------------------*/

DELIMITER //
-- Trigger para la tabla 'Venta' (Inserción)
DROP TRIGGER IF EXISTS tr_venta_insert;
CREATE TRIGGER tr_venta_insert
AFTER INSERT ON Venta
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Inserción', current_user(), NOW(), 'Venta');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Venta' (Actualización)
DROP TRIGGER IF EXISTS tr_venta_update;
CREATE TRIGGER tr_venta_update
AFTER UPDATE ON Venta
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Actualización', current_user(), NOW(), 'Venta');
END;
//DELIMITER //

DELIMITER //
-- Trigger para la tabla 'Venta' (Eliminación)
DROP TRIGGER IF EXISTS tr_venta_delete;
CREATE TRIGGER tr_venta_delete
AFTER DELETE ON Venta
FOR EACH ROW
BEGIN
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla) VALUES ('Eliminación', current_user(), NOW(), 'Venta');
END;
//DELIMITER //

/*Trigger unico*---------------------------------------------------------------------------------------------/

/*1---------------------------------------------------------------------------------------------------------*/
DELIMITER //

-- Trigger para la tabla 'Bitacora' (Inserción)
CREATE TRIGGER tr_bitacora_insert
AFTER INSERT ON Bitacora
FOR EACH ROW
BEGIN
  -- Registra la inserción en la bitácora de la tabla de bitácora
  INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
  VALUES ('Inserción en Bitacora', current_user(), NOW(), 'Bitacora');
END;
//
DELIMITER ;
