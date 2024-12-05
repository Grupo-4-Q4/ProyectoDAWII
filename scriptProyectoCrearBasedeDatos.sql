CREATE DATABASE `proyecto` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `detallelistas` (
  `idDetalle` int NOT NULL AUTO_INCREMENT,
  `idLista` int NOT NULL,
  `productoId` int NOT NULL,
  `origen` varchar(45) NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `idLista` (`idLista`),
  CONSTRAINT `detallelistas_ibfk_1` FOREIGN KEY (`idLista`) REFERENCES `listasproductos` (`idLista`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `listasproductos` (
  `idLista` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idLista`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `listasproductos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `productos-colonia` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(100) NOT NULL,
  `precioProducto` decimal(8,2) NOT NULL,
  `imagenProducto` text,
  `disponible` bit(1) DEFAULT b'1',
  `categoria` varchar(45) DEFAULT NULL,
  `origen` varchar(45) NOT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5520 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `productos-walmart` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(200) NOT NULL,
  `precioProducto` decimal(8,2) NOT NULL,
  `imagenProducto` text,
  `disponible` bit(1) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `origen` varchar(45) NOT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=5466 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
