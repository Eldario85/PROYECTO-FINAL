-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema integrador
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema integrador
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `integrador` DEFAULT CHARACTER SET utf8mb3 ;
USE `integrador` ;

-- -----------------------------------------------------
-- Table `integrador`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `apellido` VARCHAR(30) NOT NULL,
  `direccion` VARCHAR(30) NULL DEFAULT NULL,
  `telefono` VARCHAR(20) NULL DEFAULT NULL,
  `correo_electronico` VARCHAR(50) NULL DEFAULT NULL,
  `fecha_de_registro` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `integrador`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_del_pedido` TIMESTAMP NULL DEFAULT NULL,
  `estado` VARCHAR(50) NULL DEFAULT NULL,
  `clienteId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `clienteId` (`clienteId` ASC) VISIBLE,
  CONSTRAINT `pedido_ibfk_1`
    FOREIGN KEY (`clienteId`)
    REFERENCES `integrador`.`cliente` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `integrador`.`Imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`Imagenes` (
  `idImagen` INT NOT NULL AUTO_INCREMENT,
  `imagen` VARCHAR(100) NULL,
  PRIMARY KEY (`idImagen`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `integrador`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `Imagenes_idImagen` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_producto_Imagenes1_idx` (`Imagenes_idImagen` ASC) VISIBLE,
  CONSTRAINT `fk_producto_Imagenes1`
    FOREIGN KEY (`Imagenes_idImagen`)
    REFERENCES `integrador`.`Imagenes` (`idImagen`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `integrador`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `integrador`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `nickname` VARCHAR(50) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `usuarioId` INT NULL DEFAULT NULL,
  `cliente_id` INT NOT NULL,
  `rol_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_cliente1_idx` (`cliente_id` ASC) VISIBLE,
  INDEX `fk_usuario_rol1_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_cliente1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `integrador`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_rol1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `integrador`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `integrador`.`producto_has_pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `integrador`.`producto_has_pedido` (
  `producto_id` INT NOT NULL,
  `pedido_id` INT NOT NULL,
  PRIMARY KEY (`producto_id`, `pedido_id`),
  INDEX `fk_producto_has_pedido_pedido1_idx` (`pedido_id` ASC) VISIBLE,
  INDEX `fk_producto_has_pedido_producto1_idx` (`producto_id` ASC) VISIBLE,
  CONSTRAINT `fk_producto_has_pedido_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `integrador`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_has_pedido_pedido1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `integrador`.`pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
