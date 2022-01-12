-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2022 at 01:22 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todos`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--
-- Error reading structure for table todos.tblusers: #1932 - Table 'todos.tblusers' doesn't exist in engine
-- Error reading data for table todos.tblusers: #1064 - You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'FROM `todos`.`tblusers`' at line 1

-- --------------------------------------------------------

--
-- Table structure for table `tbl_todos`
--

CREATE TABLE `tbl_todos` (
  `id` int(11) NOT NULL,
  `task` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0,
  `date_added` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_todos`
--

INSERT INTO `tbl_todos` (`id`, `task`, `status`, `date_added`) VALUES
(5, 'Eating dinner', 1, '2022-01-12 20:15:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_todos`
--
ALTER TABLE `tbl_todos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_todos`
--
ALTER TABLE `tbl_todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
