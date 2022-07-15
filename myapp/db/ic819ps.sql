-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15-Jul-2022 às 03:09
-- Versão do servidor: 10.4.18-MariaDB
-- versão do PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ic819ps`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `classes`
--

CREATE TABLE `classes` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `local` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `classes`
--

INSERT INTO `classes` (`id`, `code`, `local`, `createdAt`, `updatedAt`) VALUES
(1, '11', 'PAP-SI LAB 01', '2022-07-05 23:00:08', '2022-07-05 23:00:08'),
(2, '12', 'PAP-SI LAB 02', '2022-07-05 23:00:08', '2022-07-05 23:00:08'),
(3, '15', 'PAP-SI LAB05', '2022-07-06 00:19:35', '2022-07-06 00:19:35');

-- --------------------------------------------------------

--
-- Estrutura da tabela `class_students`
--

CREATE TABLE `class_students` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `studentId` int(10) UNSIGNED NOT NULL,
  `classId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `class_students`
--

INSERT INTO `class_students` (`createdAt`, `updatedAt`, `studentId`, `classId`) VALUES
('2022-07-05 21:02:58', '2022-07-05 21:02:58', 1, 1),
('2022-07-05 23:16:00', '2022-07-05 23:16:00', 2, 1),
('2022-07-05 23:17:03', '2022-07-05 23:17:03', 3, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `courses`
--

CREATE TABLE `courses` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `courses`
--

INSERT INTO `courses` (`id`, `code`, `name`, `credits`, `createdAt`, `updatedAt`) VALUES
(1, 'IC910', 'Governaça de TI', 4, '2022-07-14 21:36:21', '2022-07-14 21:36:21'),
(2, 'IC920', 'Arquitetura de Software', 6, '2022-07-14 21:37:26', '2022-07-14 21:37:26'),
(3, 'IH940', 'Ética', 2, '2022-07-14 21:37:48', '2022-07-14 21:37:48');

-- --------------------------------------------------------

--
-- Estrutura da tabela `historics`
--

CREATE TABLE `historics` (
  `grade` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `studentId` int(10) UNSIGNED NOT NULL,
  `courseId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `historics`
--

INSERT INTO `historics` (`grade`, `createdAt`, `updatedAt`, `studentId`, `courseId`) VALUES
(6, '2022-07-14 22:11:44', '2022-07-14 22:11:44', 1, 1),
(5.5, '2022-07-14 22:12:24', '2022-07-14 22:12:24', 1, 2),
(8.2, '2022-07-14 22:12:32', '2022-07-14 22:12:32', 1, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `students`
--

CREATE TABLE `students` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `registration` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `students`
--

INSERT INTO `students` (`id`, `name`, `registration`, `createdAt`, `updatedAt`) VALUES
(1, 'Fulano', '20220001', '2022-06-30 23:46:11', '2022-06-30 23:46:11'),
(2, 'Ciclano', '20220002', '2022-06-30 23:46:11', '2022-06-30 23:46:11'),
(3, 'abbot', '202200011', '2022-06-30 22:45:21', '2022-06-30 22:45:21'),
(4, 'Brent', '20210006', '2022-07-14 22:15:17', '2022-07-14 22:15:17'),
(5, 'Clive', '20190005', '2022-07-14 22:15:42', '2022-07-14 22:15:42');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `local` (`local`);

--
-- Índices para tabela `class_students`
--
ALTER TABLE `class_students`
  ADD PRIMARY KEY (`studentId`,`classId`),
  ADD KEY `classId` (`classId`);

--
-- Índices para tabela `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `historics`
--
ALTER TABLE `historics`
  ADD PRIMARY KEY (`studentId`,`courseId`),
  ADD KEY `courseId` (`courseId`);

--
-- Índices para tabela `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `registration` (`registration`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `students`
--
ALTER TABLE `students`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `class_students`
--
ALTER TABLE `class_students`
  ADD CONSTRAINT `class_students_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `class_students_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `historics`
--
ALTER TABLE `historics`
  ADD CONSTRAINT `historics_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historics_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
