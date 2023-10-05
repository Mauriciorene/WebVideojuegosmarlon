/*BD VideojuegosMarlo*/
CREATE DATABASE IF NOT EXISTS BDVideojuegosMarlon;
USE BDVideojuegosMarlon;

/*Entidades --Tablas*/
CREATE TABLE Usuario (
 id_Usuario INT	NOT NULL,
 nombre   VARCHAR(20) NOT NULL,
 apellido VARCHAR(20) NOT NULL,
 correo VARCHAR(50) NOT NULL,
 telefono VARCHAR (8),
 PRIMARY KEY (id_Usuario)
 );
 
 CREATE TABLE Categoria(
	id_categoria INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_categoria)
 );
 
 CREATE TABLE Producto(
	id_producto INT NOT NULL,
    id_categoria INT NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    nombreProducto VARCHAR(30) NOT NULL,
    precio FLOAT NOT NULL,
    Stock INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria),
    PRIMARY KEY (id_producto)
);

CREATE TABLE Venta(
	id_venta INT NOT NULL,
	id_usuario INT	NOT NULL,
    nombreCliente VARCHAR(30) NOT NULL,
    id_producto INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto),
    PRIMARY KEY (num_venta)
);

CREATE TABLE Detalle(
	num_detalle INT NOT NULL,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES Venta (id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto),
    PRIMARY KEY (num_detalle)
);

CREATE TABLE Bitacora (
    id_bitacora INT AUTO_INCREMENT,
    evento VARCHAR(255) NOT NULL,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_bitacora)
);

/*Trigger*/

/*Trigger para inserción*/

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterInsert
AFTER INSERT ON Usuario FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se insertó un registro en la tabla Usuario');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterInsertCategoria
AFTER INSERT ON Categoria FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se insertó un registro en la tabla Categoria');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterInsertProducto
AFTER INSERT ON Producto FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se insertó un registro en la tabla Producto');
END;
//
DELIMITER ;

-- Repite el proceso para las otras tablas que desees monitorear e insertar en la bitácora.

/*Trigger para actualización*/

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterUpdate
AFTER UPDATE ON Usuario FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se actualizó un registro en la tabla Usuario');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterUpdateCategoria
AFTER UPDATE ON Categoria FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se actualizó un registro en la tabla Categoria');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterUpdateProducto
AFTER UPDATE ON Producto FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se actualizó un registro en la tabla Producto');
END;
//
DELIMITER ;

-- Repite el proceso para las otras tablas que desees monitorear e insertar en la bitácora.

/*Trigger para eliminación*/

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterDelete
AFTER DELETE ON Usuario FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se eliminó un registro en la tabla Usuario');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterDeleteCategoria
AFTER DELETE ON Categoria FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se eliminó un registro en la tabla Categoria');
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER InsertarBitacoraAfterDeleteProducto
AFTER DELETE ON Producto FOR EACH ROW
BEGIN
    INSERT INTO Bitacora (evento) VALUES ('Se eliminó un registro en la tabla Producto');
END;
//
DELIMITER ;

-- Repite el proceso para las otras tablas que desees monitorear e insertar en la bitácora.




 
