-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detallelistas`
--

DROP TABLE IF EXISTS `detallelistas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallelistas` (
  `idDetalle` int NOT NULL AUTO_INCREMENT,
  `idLista` int NOT NULL,
  `productoId` int NOT NULL,
  `nombreProducto` varchar(200) NOT NULL,
  `precioProducto` decimal(10,0) NOT NULL,
  `comparacionId` int NOT NULL,
  `nombreComparacion` varchar(200) NOT NULL,
  `precioComparacion` decimal(10,0) NOT NULL,
  PRIMARY KEY (`idDetalle`),
  KEY `idLista` (`idLista`),
  CONSTRAINT `detallelistas_ibfk_1` FOREIGN KEY (`idLista`) REFERENCES `listasproductos` (`idLista`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallelistas`
--

LOCK TABLES `detallelistas` WRITE;
/*!40000 ALTER TABLE `detallelistas` DISABLE KEYS */;
INSERT INTO `detallelistas` VALUES (7,21,613,'Café Oro 226 Gr.',45,105,'Café Nescafé Dolce Gusto Americano 136 Gr',281),(8,22,3586,'Leche Entera Sula Uht Enriquecida y Fortificada - 0.946ml',40,1376,'Leche Uht Sula Entera 0.946 Lt',40),(9,22,764,'Frijoles La Chula Rojos Volteado 2268 Gramos',96,162,'Frijoles Rojos La Chula Volteados Picante Medio 400 Gr',29),(10,23,764,'Frijoles La Chula Rojos Volteado 2268 Gramos',96,69,'Frijol Refrito La Chula Receta Criolla Rojos Volteado 28 Oz',54),(11,23,3601,'Queso Frijolero Lacteos Nelly -440gr',84,999,'Queso Dos Pinos Tipo Manchego 340Gr',231),(12,24,412,'Arroz Blanco Progreso Grano Limpio 1750gr',52,14,'Sopa Criolla Maggi Para Menudos Con Arroz 50 Gr',11),(21,29,3586,'Leche Entera Sula Uht Enriquecida y Fortificada - 0.946ml',40,1376,'Leche Uht Sula Entera 0.946 Lt',40),(22,29,613,'Café Oro 226 Gr.',45,322,'Café Maya De Palo Bolsa 444 Gr',76),(23,29,4347,'Frijoles La Copaneca Parados - 454Gr',26,1895,'Frijoles Cocidos El Gran Sabor 16 Oz',26);
/*!40000 ALTER TABLE `detallelistas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 18:25:41
