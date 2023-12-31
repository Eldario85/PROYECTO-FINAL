DROP SCHEMA IF EXISTS `Integrador` ;

-- Crear la base de datos
CREATE SCHEMA IF NOT EXISTS `Integrador` DEFAULT CHARACTER SET utf8mb3 ;
USE `Integrador` ;


-- Crear la tabla de Roles
CREATE TABLE IF NOT EXISTS Roles (
    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_del_rol VARCHAR(30) NOT NULL
);

-- Crear la tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    telefono VARCHAR(15),
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id)
);

-- Crear la tabla de Equipos
CREATE TABLE IF NOT EXISTS Equipos (
    equipo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_del_equipo VARCHAR(50) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    liga VARCHAR(50) NOT NULL,
    año_de_fundacion INT
);

-- Crear la tabla de Tallas
CREATE TABLE IF NOT EXISTS Tallas (
    talla_id INT AUTO_INCREMENT PRIMARY KEY,
    talla VARCHAR(10) NOT NULL
);

-- Crear la tabla de Camisetas
CREATE TABLE IF NOT EXISTS Camisetas (
    camiseta_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_del_producto VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    equipo_id INT,
    talla_id INT,
    FOREIGN KEY (equipo_id) REFERENCES Equipos(equipo_id),
    FOREIGN KEY (talla_id) REFERENCES Tallas(talla_id)
);

-- Crear la tabla de Camiseta_Imagenes
CREATE TABLE IF NOT EXISTS Camiseta_Imagenes (
    imagen_id INT AUTO_INCREMENT PRIMARY KEY,
    camiseta_id INT,
    imagen_url VARCHAR(250) NOT NULL,
    FOREIGN KEY (camiseta_id) REFERENCES Camisetas(camiseta_id)
);

-- Crear la tabla de Pedidos
CREATE TABLE IF NOT EXISTS Pedidos (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    fecha_del_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Crear la tabla de Detalles del Pedido
CREATE TABLE IF NOT EXISTS Detalles_del_Pedido (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    camiseta_id INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Pedidos(order_id),
    FOREIGN KEY (camiseta_id) REFERENCES Camisetas(camiseta_id)
);

-- Crear la tabla de Reseñas
CREATE TABLE IF NOT EXISTS Reseñas (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    camiseta_id INT,
    user_id INT,
    calificacion INT NOT NULL,
    texto_de_la_resena TEXT,
    fecha_de_la_resena TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (camiseta_id) REFERENCES Camisetas(camiseta_id),
    FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
