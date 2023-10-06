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

/*Trigger para actualización*/

/*Trigger para eliminación*/
