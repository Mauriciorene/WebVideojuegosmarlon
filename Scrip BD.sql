CREATE DATABASE IF NOT EXISTS BDVideojuegosMarlon;
USE BDVideojuegosMarlon;

/* Tabla de Usuarios para el Login*/
CREATE TABLE Usuario (
  id_Usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario VARCHAR(30) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  contrasena VARCHAR(16) NOT NULL,
  rol VARCHAR(20) NOT NULL
);
INSERT INTO Usuario (nombre_Usuario, apellido, contrasena, rol) VALUES ('Mauricio', 'Rubio', '202322', 'admin');
SELECT * FROM Usuario;

/* Tabla de Usuarios */
CREATE TABLE Usuario (
 id_Usuario INT NOT NULL AUTO_INCREMENT,
 nombre VARCHAR(20) NOT NULL,
 apellido VARCHAR(20) NOT NULL,
 correo VARCHAR(50) NOT NULL,
 telefono VARCHAR(8),
 nombreUsuario VARCHAR(20) NOT NULL,
 contraseña VARCHAR(10) NOT NULL,
 PRIMARY KEY (id_Usuario)
 );

 /* Tabla de Clientes */
CREATE TABLE Cliente (
 id_cliente INT NOT NULL AUTO_INCREMENT,
 nombre VARCHAR(20) NOT NULL,
 apellido VARCHAR(20) NOT NULL,
 telefono VARCHAR(8),
 PRIMARY KEY (id_cliente)
 );

/* Tabla de Categorías */
CREATE TABLE Categoria(
    id_categoria INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_categoria)
 );

/* Tabla de Productos */
CREATE TABLE Producto(
    id_producto INT NOT NULL AUTO_INCREMENT,
    id_categoria INT NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    nombreProducto VARCHAR(30) NOT NULL,
    precio FLOAT NOT NULL,
    Stock INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria (id_categoria),
    PRIMARY KEY (id_producto)
);

/* Tabla de Ventas */
CREATE TABLE Venta(
    id_venta INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    fecha DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario (id_Usuario),
    FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
    PRIMARY KEY (id_venta)
);

/* Tabla de Detalles de Venta */
CREATE TABLE Detalle(
    num_detalle INT NOT NULL AUTO_INCREMENT,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio FLOAT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES Venta (id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto (id_producto),
    PRIMARY KEY (num_detalle)
);

/* Tabla de Bitácora */
CREATE TABLE Bitacora (
    id_bitacora INT NOT NULL AUTO_INCREMENT,
    transaccion VARCHAR(10) NOT NULL,
    usuario VARCHAR(40) NOT NULL,
    fecha DATETIME NOT NULL,
    tabla VARCHAR(20) NOT NULL,
    PRIMARY KEY (id_bitacora)
);