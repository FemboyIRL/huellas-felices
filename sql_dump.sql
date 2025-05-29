-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 29, 2025 at 03:31 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `huellas_seguras`
--

-- --------------------------------------------------------

--
-- Table structure for table `historial_medico`
--

CREATE TABLE `historial_medico` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_mascota` char(36) NOT NULL,
  `fecha` date NOT NULL,
  `procedimiento` text NOT NULL,
  `notas` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mascotas`
--

CREATE TABLE `mascotas` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `tipo` varchar(50) NOT NULL,
  `user_id` char(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `edad`, `raza`, `peso`, `tipo`, `user_id`, `created_at`, `updated_at`) VALUES
('80d70c2e-3c0a-11f0-ba28-eae5f755313c', 'Max', 5, 'Golden Retriever', 28.50, 'Perro', 'aaa1fd6aaa8a8f9fe4906d3cc1493a5b', '2025-05-28 21:27:05', '2025-05-28 21:27:05');

-- --------------------------------------------------------

--
-- Table structure for table `ubicacion_mascotas`
--

CREATE TABLE `ubicacion_mascotas` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_mascota` char(36) NOT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(11,8) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ubicacion_mascotas`
--

INSERT INTO `ubicacion_mascotas` (`id`, `created_at`, `id_mascota`, `lat`, `lng`, `timestamp`) VALUES
('861ba765-3c14-11f0-ba28-eae5f755313c', '2025-05-28 22:38:49', '80d70c2e-3c0a-11f0-ba28-eae5f755313c', 35.43260770, -90.13320800, '2025-05-28 23:01:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `created_at`) VALUES
('1039fb759a1a739436a1b599e02dd680', 'aaa', 'aaa', 'aa@gmail.com', '$2b$10$gnpNnrCfgKTHAhpQTFZX0uu/sV58xMQ4LK7ArKqqP4ZCnEcGT5XjS', '2025-05-28 22:35:39'),
('10f38aebad356904417eb998b95f02e6', 'papu', 'buelo', 'papu2@gmail.com', '$2b$10$vG3kYJVnBkl5Nci54yURP.XIIMpMIV2nt78H/5cONcpuZRgqrlnbS', '2025-05-28 22:17:40'),
('4f7d250a66a1d1a692bfc9b2fcc5534f', 'Adrian', 'Robles', 'Aaa@gmail.com', '$2b$10$DZ08qcPYw0PUHeZ2I7j/cund0ubpCM1uUjalVMSJyh.bLa3QdqfO6', '2025-05-28 21:55:41'),
('64220bc22fdbeb2ffe11548c1a862741', 'Adrian', 'Robles', 'AdrianR@gmail.com', '$2b$10$IfdQHDFSsGZ6vTU8L2.JjOJAP2//omGG2oJjPDW7tqYRv.cWsrm.e', '2025-05-28 22:54:04'),
('92b155d4b9a55c3bea628635c363b6be', 'aa', 'aa', 'aaaaa@gmail.com', '$2b$10$.o4ms/SB1.92vXoeEDBmxesJZmQaIyRHmnIVY4UxLypvWRXUxJtE.', '2025-05-28 22:56:54'),
('aaa1fd6aaa8a8f9fe4906d3cc1493a5b', 'papu', 'buelo', 'papu@gmail.com', '$2b$10$jrrBYBOUtySBeXdLHyQQWuglh2w0AzfMnyE7qztGj7YOAs2b5vtli', '2025-05-28 20:40:17'),
('d58f6a609409812c07dd6a4300cd561d', 'Aaa', 'aaa', 'Aaaa@gmail.com', '$2b$10$7X3LztYmrv/Nvxu0/SJhIOFpdjN1Q0lRUBfIjztfE050/rkcl2TOS', '2025-05-28 22:13:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indexes for table `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ubicacion_mascotas`
--
ALTER TABLE `ubicacion_mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `historial_medico_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ubicacion_mascotas`
--
ALTER TABLE `ubicacion_mascotas`
  ADD CONSTRAINT `ubicacion_mascotas_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
