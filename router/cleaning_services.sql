-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- 主機： localhost:3306
-- 產生時間： 2023-09-14 10:35:17
-- 伺服器版本： 5.7.24
-- PHP 版本： 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `cleaning_services`
--
CREATE DATABASE IF NOT EXISTS `cleaning_services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cleaning_services`;

-- --------------------------------------------------------

--
-- 資料表結構 `adreessdist`
--

CREATE TABLE `adreessdist` (
  `dist` varchar(5) NOT NULL,
  `v` varchar(30) NOT NULL,
  `A_I` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `adreessdist`
--

INSERT INTO `adreessdist` (`dist`, `v`, `A_I`) VALUES
('中區', 'Central', 1),
('北區', 'North', 2),
('南區', 'South', 3),
('西區', 'West', 4),
('東區', 'Eastern', 5),
('北屯區', 'Beitun', 6),
('南屯區', 'Nantun', 7),
('西屯區', 'Xitun', 8),
('豐原區', 'Fengyuan', 9),
('大里區', 'Dali', 10),
('太平區', 'Taiping', 11),
('烏日區', 'Uri', 12),
('大雅區', 'Daya', 13),
('潭子區', 'Tanzi', 14),
('新社區', 'Xinshe', 15),
('神岡區', 'Shengang', 16),
('龍井區', 'Longjing', 17),
('沙鹿區', 'Shalu', 18);

-- --------------------------------------------------------

--
-- 資料表結構 `attendance`
--

CREATE TABLE `attendance` (
  `employeeid` varchar(5) NOT NULL,
  `mode` int(1) NOT NULL,
  `time` int(1) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--

CREATE TABLE `blacklist` (
  `userid` varchar(8) NOT NULL,
  `whyblacklist` varchar(100) NOT NULL DEFAULT '未說明',
  `blacktime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `employeeinfo`
--

CREATE TABLE `employeeinfo` (
  `employeeid` varchar(5) NOT NULL,
  `employeename` varchar(20) NOT NULL,
  `employeephone` varchar(10) NOT NULL,
  `employeeemail` varchar(50) NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `vaccine` int(1) NOT NULL,
  `goodid` int(1) NOT NULL,
  `racheck` int(1) NOT NULL,
  `cases` int(5) NOT NULL DEFAULT '0',
  `employeepw` varchar(50) NOT NULL,
  `employeeidnumber` varchar(10) NOT NULL,
  `employeebirthday` date NOT NULL,
  `empcity` varchar(10) NOT NULL DEFAULT '臺中市',
  `emprural` varchar(10) NOT NULL,
  `empaddress` varchar(50) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '1',
  `employeetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `evaluate`
--

CREATE TABLE `evaluate` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `efficiency` int(11) DEFAULT NULL,
  `clean` int(11) DEFAULT NULL,
  `careful` int(11) DEFAULT NULL,
  `manner` int(11) DEFAULT NULL,
  `reply` varchar(100) DEFAULT NULL,
  `state` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `orderlist`
--

CREATE TABLE `orderlist` (
  `ornumber` varchar(10) NOT NULL,
  `orphone` varchar(10) NOT NULL,
  `oremail` varchar(50) NOT NULL,
  `orcity` varchar(10) NOT NULL,
  `orrural` varchar(10) NOT NULL,
  `oraddress` varchar(50) NOT NULL,
  `userid` varchar(8) NOT NULL,
  `orname` varchar(20) NOT NULL,
  `money` int(7) NOT NULL,
  `pay` varchar(1) NOT NULL,
  `ordertime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orderdone` datetime DEFAULT NULL,
  `state` int(2) NOT NULL,
  `note` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `pricelist`
--

CREATE TABLE `pricelist` (
  `weeknumber` int(4) NOT NULL,
  `price` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `pricelist`
--

INSERT INTO `pricelist` (`weeknumber`, `price`) VALUES
(4, 8000),
(5, 10000),
(6, 12000),
(7, 14000),
(8, 14400),
(9, 16200),
(10, 18000),
(11, 19800),
(12, 21600),
(13, 23400),
(14, 25200),
(15, 27000),
(16, 25600),
(17, 27200),
(18, 28800),
(19, 30400),
(20, 32000),
(21, 33600),
(22, 35200),
(23, 36800),
(24, 38400);

-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--

CREATE TABLE `userinfo` (
  `uid` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `city` varchar(10) NOT NULL DEFAULT '臺中市',
  `rural` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `admin` int(1) DEFAULT '0',
  `userid` varchar(8) NOT NULL,
  `jointime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blacklist` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uid`, `name`, `birthday`, `phone`, `email`, `id`, `password`, `city`, `rural`, `address`, `admin`, `userid`, `jointime`, `blacklist`) VALUES
(51, '孫博國', '1979-03-08', '0936025896', 'johnson1848@gmail.com', 'V176777368', 'Un42ev4D', '臺中市', '西屯區', '河南東一街17號', 0, 'RA000001', '2023-09-14 10:24:02', 0),
(52, '沈子成', '2013-02-15', '0923230748', 'swift2607@icloud.com', 'H137147389', 'UbY9Z9kP', '臺中市', '烏日區', '自強街13號', 0, 'RA000002', '2023-09-14 10:26:37', 0),
(53, '李傑寒', '1975-12-20', '0930398746', 'barry3965@hotmail.com', 'Q167695858', 'd69QkK92', '臺中市', '太平區', '園區五路6號', 0, 'RA000003', '2023-09-14 10:27:35', 0),
(54, '錢奕春', '1994-12-30', '0986550089', 'jerry8882@gmail.com', 'Y169875145', '7M6EG6kd', '臺中市', '南屯區', '文山一街16號', 0, 'RA000004', '2023-09-14 10:28:19', 0),
(55, '陳偲璐', '1974-06-06', '0922177963', 'lily2364@yahoo.com', 'F231251624', 'D9Rn9566', '臺中市', '潭子區', '潭子街4號', 0, 'RA000005', '2023-09-14 10:29:04', 0),
(56, '蔣冉瑄', '1972-11-03', '0928958260', 'chantel6709@gmail.com', 'I291180474', 'H4p9eqHB', '臺中市', '大里區', '泉水街11號', 0, 'RA000006', '2023-09-14 10:30:06', 0),
(57, '王嘉堇', '1970-04-02', '0931347252', 'rodney2738@hotmail.com', 'U198074392', 'nQ867DqE', '臺中市', '西屯區', '天水西一街24號', 0, 'RA000007', '2023-09-14 10:30:42', 0),
(58, '王修嶽', '1960-02-17', '0929047858', 'middleton852@hotmail.com', 'G176206102', '949zTk39', '臺中市', '烏日區', '成功西路18號', 0, 'RA000008', '2023-09-14 10:32:26', 0),
(59, '李叡業', '1960-07-05', '0955222092', 'campbell8610@gmail.com', 'B128690497', '6SX97z4E', '臺中市', '南區', '民興街1號', 0, 'RA000009', '2023-09-14 10:33:18', 0),
(60, '傅維義', '2014-05-09', '0939399820', 'pattie4389@gmail.com', 'C275534847', '54Z68GJ8', '臺中市', '南屯區', '大墩五街1號', 0, 'RA000010', '2023-09-14 10:33:57', 0),
(61, '何玫瑋', '1988-07-07', '0930843010', 'rosie4912@outlook.com', 'L254399103', '9S29vq5T', '臺中市', '太平區', '振德街16號', 0, 'RA000011', '2023-09-14 10:34:40', 0);

-- --------------------------------------------------------

--
-- 資料表結構 `userorder`
--

CREATE TABLE `userorder` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `date` date NOT NULL,
  `time` int(2) NOT NULL,
  `weeks` int(2) NOT NULL,
  `donetime` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `adreessdist`
--
ALTER TABLE `adreessdist`
  ADD PRIMARY KEY (`A_I`);

--
-- 資料表索引 `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `userid` (`userid`);

--
-- 資料表索引 `employeeinfo`
--
ALTER TABLE `employeeinfo`
  ADD PRIMARY KEY (`employeeid`),
  ADD UNIQUE KEY `employeeemail` (`employeeemail`,`employeeidnumber`);

--
-- 資料表索引 `evaluate`
--
ALTER TABLE `evaluate`
  ADD PRIMARY KEY (`ornumber`);

--
-- 資料表索引 `orderlist`
--
ALTER TABLE `orderlist`
  ADD PRIMARY KEY (`ornumber`);

--
-- 資料表索引 `pricelist`
--
ALTER TABLE `pricelist`
  ADD PRIMARY KEY (`weeknumber`);

--
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`,`id`);

--
-- 資料表索引 `userorder`
--
ALTER TABLE `userorder`
  ADD PRIMARY KEY (`ornumber`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `adreessdist`
--
ALTER TABLE `adreessdist`
  MODIFY `A_I` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
