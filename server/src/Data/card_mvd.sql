-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2023 a las 15:26:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6


CREATE DATABASE card_mvd;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `card_mvd`
--
USE card_mvd;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `car_id` int(11) NOT NULL,
  `u_id` int(11) DEFAULT NULL,
  `car_fech` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `det_id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `det_prod` text DEFAULT NULL,
  `det_cant` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `opi_id` int(11) NOT NULL,
  `u_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `opi_comen` text DEFAULT NULL,
  `opi_valor` varchar(1) DEFAULT NULL,
  `opi_fech` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `pago_id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  `pago_sta` int(11) DEFAULT NULL,
  `pago_fech` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `prod_id` int(11) NOT NULL,
  `prod_nom` varchar(250) DEFAULT NULL,
  `prod_img` text DEFAULT NULL,
  `prod_desc` text DEFAULT NULL,
  `prod_precio` float DEFAULT NULL,
  `prod_precio_dcto` float DEFAULT NULL,
  `prod_marca` varchar(30) DEFAULT NULL,
  `prod_model` varchar(30) DEFAULT NULL,
  `prod_cate` varchar(100) DEFAULT NULL,
  `prod_calif` int(1) NOT NULL,
  `prod_stock` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`prod_id`, `prod_nom`, `prod_img`, `prod_desc`, `prod_precio`, `prod_precio_dcto`, `prod_marca`, `prod_model`, `prod_cate`, `prod_calif`, `prod_stock`) VALUES
(1, 'Battlefield 2042', 'productos/1701147380535-p1.jfif', '\r\nEs un juego de disparos en primera persona que marca el regreso de la icónica guerra total de la franquicia. Con la ayuda de un arsenal innovador, participa en batallas multijugador intensas e inmersivas.', 100000, 50, 'sony', '2013', 'videojuegos de roll', 5, 100),
(94, 'Need for Speed Unbound ', 'productos/1701147442490-carros.jfif', '\r\nNeed for Speed Unbound es un juego de conducción arcade en mundo abierto desarrollado por Criterion Games y Electronic Arts para PlayStation 5, Xbox Series y PC. La mítica saga de conducción que nos viene acompañando desde los 90 vuelve a dar el salto al mundo abierto con frenéticas y espectaculares carreras en entornos urbanos, con pruebas de velocidad, derrapes, coleccionables y mucho más, con un apartado gráfico muy llamativo con toques de anime.', 40000, 50, 'sony', '2022', 'videojuegos de carros', 5, 5),
(95, 'Crusader Kings II ', 'productos/1701147519947-ted.jfif', 'Crusader Kings II (abreviado: CK II) es un videojuego de estrategia en tiempo real para computadoras personales desarrollado por Paradox Development Studio y distribuido por Paradox Interactive. Fue lanzado el 14 de febrero de 2012. El juego está ambientado en la Edad Media, desde 1066 a 1453.\r\n', 500000, 10, 'xbox', '253', 'videojuegos de roll', 4, 3),
(96, 'TERA', 'productos/1701147752006-tera.jfif', 'TERA es un juego de rol y acción multijugador en el que lucharemos para proteger a la Federación de Valkyon, mientras conseguimos gloria y poder. A cargo de Bluehole Studio y Frogster Interactive para PC, PlayStation 4 y Xbox One.', 10000, 50, 'xbox', '2013', 'videojuegos de roll', 5, 33);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `u_id` int(25) NOT NULL,
  `u_ced` varchar(20) DEFAULT NULL,
  `u_nom` varchar(50) DEFAULT NULL,
  `u_usu` varchar(20) DEFAULT NULL,
  `u_pass` varchar(15) DEFAULT NULL,
  `u_telf` varchar(15) DEFAULT NULL,
  `u_ema` varchar(50) DEFAULT NULL,
  `u_nac` date DEFAULT NULL,
  `u_dir` text DEFAULT NULL,
  `u_nivel` varchar(2) DEFAULT NULL,
  `u_status` varchar(10) DEFAULT NULL,
  `u_foto` varchar(100) DEFAULT NULL,
  `u_crea` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`u_id`, `u_ced`, `u_nom`, `u_usu`, `u_pass`, `u_telf`, `u_ema`, `u_nac`, `u_dir`, `u_nivel`, `u_status`, `u_foto`, `u_crea`) VALUES
(26, NULL, 'spike', 'spike', '1234', NULL, 'spike@gmail.com', NULL, NULL, 'Cl', 'Activo', NULL, '2023-11-28 02:43:45'),
(28, NULL, 'Gabriel', 'gabriel@gmail.com', '5678', NULL, 'gabriel@gmail.com', NULL, NULL, 'Cl', 'Activo', NULL, '2023-11-30 14:07:37');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`det_id`),
  ADD KEY `prod_id` (`prod_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indices de la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`opi_id`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`pago_id`),
  ADD KEY `car_id` (`car_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalles`
--
ALTER TABLE `detalles`
  MODIFY `det_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `opinion`
--
ALTER TABLE `opinion`
  MODIFY `opi_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `pago_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `prod_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `u_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `usuario` (`u_id`);

--
-- Filtros para la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD CONSTRAINT `detalles_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `producto` (`prod_id`),
  ADD CONSTRAINT `detalles_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `carrito` (`car_id`);

--
-- Filtros para la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `usuario` (`u_id`),
  ADD CONSTRAINT `opinion_ibfk_2` FOREIGN KEY (`prod_id`) REFERENCES `producto` (`prod_id`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `carrito` (`car_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
