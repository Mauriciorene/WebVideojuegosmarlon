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
DELIMITER ;

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
DELIMITER ;

-- Trigger para eliminar en Cliente
DELIMITER //
CREATE TRIGGER TriggerDeleteCliente
AFTER DELETE ON Cliente
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Cliente');
//
DELIMITER ;

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
DELIMITER ;

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
DELIMITER ;

-- Trigger para eliminar en Categoria
DELIMITER //
CREATE TRIGGER TriggerDeleteCategoria
AFTER DELETE ON Categoria
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Categoria');
//
DELIMITER ;

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
DELIMITER ;

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
DELIMITER ;

-- Trigger para eliminar en Producto
DELIMITER //
CREATE TRIGGER TriggerDeleteProducto
AFTER DELETE ON Producto
FOR EACH ROW
INSERT INTO bitacora (transaccion, usuario, fecha, tabla)
VALUES ('DELETE', current_user(), NOW(), 'Producto');
//
DELIMITER ;

/*Venta----------------------------------------------------------------------------------------------*/
-- Trigger para la tabla Venta
-- Trigger para insertar en Venta
DELIMITER //
CREATE TRIGGER TriggerInsertVenta
AFTER INSERT ON Venta
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('INSERT', current_user(), NOW(), 'Venta');
END;
//
DELIMITER ;

-- Verificar si se activó el trigger
SELECT * FROM Bitacora;

-- Trigger para actualizar en Venta
DELIMITER //
CREATE TRIGGER TriggerUpdateVenta
BEFORE UPDATE ON Venta
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('UPDATE', current_user(), NOW(), 'Venta');
END;
//
DELIMITER ;

-- Trigger para eliminar en Venta
DELIMITER //
CREATE TRIGGER TriggerDeleteVenta
AFTER DELETE ON Venta
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('DELETE', current_user(), NOW(), 'Venta');
END;
//
DELIMITER ;


-- Trigger para insertar en Detalle
DELIMITER //
CREATE TRIGGER TriggerInsertDetalle
AFTER INSERT ON Detalle
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('INSERT', current_user(), NOW(), 'Detalle');
END;
//
DELIMITER ;

-- Trigger para actualizar en Detalle
DELIMITER //
CREATE TRIGGER TriggerUpdateDetalle
BEFORE UPDATE ON Detalle
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('UPDATE', current_user(), NOW(), 'Detalle');
END;
//
DELIMITER ;

-- Trigger para eliminar en Detalle
DELIMITER //
CREATE TRIGGER TriggerDeleteDetalle
AFTER DELETE ON Detalle
FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (transaccion, usuario, fecha, tabla)
    VALUES ('DELETE', current_user(), NOW(), 'Detalle');
END;
//
DELIMITER ;
