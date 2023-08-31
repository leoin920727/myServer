-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-08-31 10:14:27
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `cleaning_services`
--
CREATE DATABASE IF NOT EXISTS `cleaning_services` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cleaning_services`;

-- --------------------------------------------------------

--
-- 資料表結構 `attendance`
--
-- 建立時間： 2023-08-31 05:52:25
--

CREATE TABLE `attendance` (
  `employeeid` varchar(5) NOT NULL,
  `mode` int(1) NOT NULL,
  `time` time DEFAULT NULL,
  `date` date DEFAULT NULL,
  `week` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `attendance`
--

TRUNCATE TABLE `attendance`;
-- --------------------------------------------------------

--
-- 資料表結構 `blacklist`
--
-- 建立時間： 2023-08-31 08:09:58
--

CREATE TABLE `blacklist` (
  `uid` int(10) NOT NULL,
  `blacklist` int(1) NOT NULL,
  `whyblacklist` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `blacklist`
--

TRUNCATE TABLE `blacklist`;
-- --------------------------------------------------------

--
-- 資料表結構 `employeeinfo`
--
-- 建立時間： 2023-08-31 05:46:48
--

CREATE TABLE `employeeinfo` (
  `employeeid` varchar(5) NOT NULL,
  `name` varchar(20) NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `photo` varchar(300) DEFAULT NULL,
  `vaccine` int(1) NOT NULL,
  `goodid` int(1) NOT NULL,
  `racheck` int(1) NOT NULL,
  `cases` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `employeeinfo`
--

TRUNCATE TABLE `employeeinfo`;
--
-- 傾印資料表的資料 `employeeinfo`
--

INSERT INTO `employeeinfo` (`employeeid`, `name`, `phone`, `email`, `photo`, `vaccine`, `goodid`, `racheck`, `cases`) VALUES
('RA001', '鄒琦筑', 958237879, 'sophia1207@hotmail.com', NULL, 1, 1, 1, 0),
('RA002', '鍾圖陽', 912175001, 'jeffrey8325@outlook.com', NULL, 1, 1, 1, 0),
('RA003', '曹克毓', 970724731, 'jane5953@yahoo.com', NULL, 1, 1, 1, 0),
('RA004', '沈芮莘', 960800071, 'fawcett9476@outlook.com', NULL, 1, 1, 1, 0),
('RA005', '洪之寶', 920012384, 'samantha1849@gmail.com', NULL, 1, 1, 1, 0),
('RA006', '楊年瀚', 930036786, 'dupont882@gmail.com', NULL, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `evaluate`
--
-- 建立時間： 2023-08-31 06:11:44
-- 最後更新： 2023-08-31 06:11:44
--

CREATE TABLE `evaluate` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `efficiency` int(11) DEFAULT NULL,
  `clean` int(11) DEFAULT NULL,
  `careful` int(11) DEFAULT NULL,
  `manner` int(11) DEFAULT NULL,
  `reply` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `evaluate`
--

TRUNCATE TABLE `evaluate`;
-- --------------------------------------------------------

--
-- 資料表結構 `orderlist`
--
-- 建立時間： 2023-08-31 08:06:35
--

CREATE TABLE `orderlist` (
  `ornumber` varchar(10) NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(20) NOT NULL,
  `city` varchar(10) NOT NULL,
  `rural` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `uid` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `money` int(7) NOT NULL,
  `pay` varchar(1) NOT NULL,
  `ordertime` datetime NOT NULL,
  `orderdone` datetime NOT NULL,
  `state` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `orderlist`
--

TRUNCATE TABLE `orderlist`;
-- --------------------------------------------------------

--
-- 資料表結構 `userinfo`
--
-- 建立時間： 2023-08-31 08:03:02
--

CREATE TABLE `userinfo` (
  `uid` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `birthday` date NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `id` varchar(10) NOT NULL,
  `password` varchar(12) NOT NULL,
  `city` varchar(10) NOT NULL,
  `rural` varchar(10) NOT NULL,
  `address` varchar(50) NOT NULL,
  `admin` int(1) NOT NULL,
  `userid` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `userinfo`
--

TRUNCATE TABLE `userinfo`;
--
-- 傾印資料表的資料 `userinfo`
--

INSERT INTO `userinfo` (`uid`, `name`, `birthday`, `phone`, `email`, `id`, `password`, `city`, `rural`, `address`, `admin`, `userid`) VALUES
(1, '熊貓管家', '1963-06-27', 920589962, 'raccoon@gmail.com', 'A236173460', 'raccoon55688', '臺中市', '西屯區', '河南東一街17號', 1, 'RA000001'),
(2, '孫博國', '1979-03-08', 936025896, 'johnson1848@gmail.com', 'V176777368', 'Un42ev4D', '臺中市', '后里區', '甲后路32號', 0, 'RA000002'),
(3, '沈子成', '2013-02-15', 923230748, 'swift2607@icloud.com', 'H137147389', 'UbY9Z9kP', '臺中市', '梧棲區', '緯五路26號', 0, 'RA000003'),
(4, '劉星鋭', '1981-08-19', 914009711, 'shelley5034@outlook.com', 'Q194326971', 'khC266QL', '臺中市', '沙鹿區', '民族路6號', 0, 'RA000004'),
(5, '鄭源瀾', '2008-07-24', 929720369, 'adames6343@hotmail.com', 'P232512436', 'yr65nM9N', '臺中市', '烏日區', '自強街13號', 0, 'RA000005'),
(6, '李傑寒', '1975-12-20', 930398746, 'barry3965@hotmail.com', 'Q167695858', 'd69QkK92', '臺中市', '太平區', '園區五路6號', 0, 'RA000006'),
(7, '錢奕春', '1994-12-30', 986550089, 'jerry8882@gmail.com', 'Y169875145', '7M6EG6kd', '臺中市', '南屯區', '文山一街16號', 0, 'RA000007'),
(8, '陳偲璐', '1974-06-06', 922177963, 'lily2364@yahoo.com', 'F231251624', 'D9Rn9566', '臺中市', '潭子區', '潭子街4號', 0, 'RA000008'),
(9, '蔣冉瑄', '1972-11-03', 928958260, 'chantel6709@gmail.com', 'I291180474', 'H4p9eqHB', '臺中市', '大里區', '泉水街11號', 0, 'RA000009'),
(10, '王嘉堇', '1970-04-02', 931347252, 'rodney2738@hotmail.com', 'U198074392', 'nQ867DqE', '臺中市', '西屯區', '天水西一街24號', 0, 'RA000010'),
(11, '陳旭順', '2006-01-18', 926271764, 'arthur439@hotmail.com', 'V138871509', '9D5Gs6rc', '臺中市', '梧棲區', '建國西街31號', 0, 'RA000011'),
(12, '董晉業', '1961-11-13', 917456967, 'martin8055@outlook.com', 'P127016765', 'UJh8DYP8', '臺中市', '石岡區', '大仁街15號', 0, 'RA000012'),
(13, '蔡才芝', '2017-08-02', 982500822, 'christian5824@gmail.com', 'U175517232', 'r7u4HY2n', '臺中市', '后里區', '犁份路2號', 0, 'RA000013'),
(14, '盧嘉夕', '1964-04-21', 933199906, 'torres6514@outlook.com', 'T252129253', '2vy487Le', '臺中市', '后里區', '公舘路15號', 0, 'RA000014'),
(15, '王修嶽', '1960-02-17', 929047858, 'middleton852@hotmail.com', 'G176206102', '949zTk39', '臺中市', '烏日區', '成功西路18號', 0, 'RA000015'),
(16, '李叡業', '1960-07-05', 955222092, 'campbell8610@gmail.com', 'B128690497', '6SX97z4E', '臺中市', '南區', '民興街1號', 0, 'RA000016'),
(17, '傅維義', '2014-05-09', 939399820, 'pattie4389@gmail.com', 'C275534847', '54Z68GJ8', '臺中市', '南屯區', '大墩五街1號', 0, 'RA000017'),
(18, '何玫瑋', '1988-07-07', 930843010, 'rosie4912@outlook.com', 'L254399103', '9S29vq5T', '臺中市', '太平區', '振德街16號', 0, 'RA000018'),
(19, '張恬玲', '1988-02-12', 986473669, 'garcia4508@icloud.com', 'L230873808', 'gzLf774v', '臺中市', '西區', '公正路16號', 0, 'RA000019'),
(20, '蕭利恩', '1991-10-20', 931533517, 'garver3630@outlook.com', 'C198536490', '3VdLtY8q', '臺中市', '豐原區', '文化街15號', 0, 'RA000020'),
(21, '鄧健容', '2009-10-17', 971551295, 'farmiga8918@icloud.com', 'W150704858', '8F7ZJqhh', '臺中市', '大安區', '興安路23號', 0, 'RA000021'),
(22, '劉嘉星', '1976-04-19', 970341719, 'garrix7642@outlook.com', 'S249658931', '92SX6s7c', '臺中市', '南屯區', '益昌二街2號', 0, 'RA000022'),
(23, '陳曄瀾', '2011-06-11', 916458929, 'thomas6671@gmail.com', 'X239097901', 'AErB5f7B', '臺中市', '東區', '建成路15號', 0, 'RA000023'),
(24, '紀恩月', '1984-07-05', 956058395, 'bowen2410@gmail.com', 'Q167591908', '49AGFvAs', '臺中市', '北屯區', '崇德九路31號', 0, 'RA000024'),
(25, '廖佩影', '1993-12-22', 918540495, 'long2043@gmail.com', 'N290718446', 'Wd27cyW8', '臺中市', '北區', '忠明八街11號', 0, 'RA000025'),
(26, '王祐馳', '2002-06-18', 929192471, 'oliver3367@yahoo.com', 'V198996367', 'E535x42q', '臺中市', '大雅區', '平和一路35號', 0, 'RA000026'),
(27, '姚爍銘', '1972-08-23', 982427547, 'lopez8015@gmail.com', 'Z131362395', '9Q6SN4Q5', '臺中市', '后里區', '月眉南路3號', 0, 'RA000027'),
(28, '劉奕漩', '1988-11-07', 937524906, 'sanders3662@gmail.com', 'I268961281', '23W84Ky6', '臺中市', '沙鹿區', '賢正街19號', 0, 'RA000028'),
(29, '許婧筱', '2000-03-25', 934729640, 'bailey6861@outlook.com', 'I280722153', 'cuE349pd', '臺中市', '大雅區', '科雅七路25號', 0, 'RA000029'),
(30, '邵星錦', '1964-03-28', 982381235, 'elmer5795@gmail.com', 'W166370484', 'zQ4q28r5', '臺中市', '北區', '台中港路30號', 0, 'RA000030'),
(31, '王升遠', '1969-01-29', 916724793, 'rahman4797@gmail.com', 'P264188188', 'c7AzFRn9', '臺中市', '后里區', '梅里路20號', 0, 'RA000031'),
(32, '巫安連', '1964-06-15', 921152383, 'kathleen7782@hotmail.com', 'D287320309', '2m65bZFm', '臺中市', '沙鹿區', '六路五街12號', 0, 'RA000032'),
(33, '歐濤萱', '2013-07-24', 923601262, 'cruz4545@gmail.com', 'Y249620262', 'nD6w9622', '臺中市', '龍井區', '中山一路31號', 0, 'RA000033'),
(34, '涂易汝', '2008-09-23', 915878916, 'sophie6293@yahoo.com', 'E273360609', '7k6v45xd', '臺中市', '大里區', '新和路11號', 0, 'RA000034'),
(35, '田嬋雲', '1982-12-17', 954482901, 'courtney7543@gmail.com', 'R287352526', '85t7Znk6', '臺中市', '大里區', '工業十二路31號', 0, 'RA000035'),
(36, '張盧萱', '1986-03-08', 929593228, 'mia3826@icloud.com', 'Z241449007', 'H99CV9zL', '臺中市', '大里區', '祥全路7號', 0, 'RA000036'),
(37, '吳佳涵', '2006-04-09', 914361087, 'shields454@gmail.com', 'E243703696', 'Bt4kQprA', '臺中市', '太平區', '振德街19號', 0, 'RA000037'),
(38, '莊亞笑', '1997-02-04', 925064152, 'kimberly3034@outlook.com', 'N200304481', 'Kt7y4d8H', '臺中市', '沙鹿區', '六路十七街5號', 0, 'RA000038'),
(39, '柯庭賢', '1991-12-12', 988589723, 'barbara949@gmail.com', 'J222354071', 'RV39QpB2', '臺中市', '梧棲區', '中二路33號', 0, 'RA000039'),
(40, '林思楷', '2000-03-05', 932922539, 'bryce7029@hotmail.com', 'N140150956', 'XE2HQ7X6', '臺中市', '大雅區', '中和七路25號', 0, 'RA000040'),
(41, '蕭懷濤', '2000-07-25', 939596222, 'natalie6765@gmail.com', 'Y291897168', 'n2aPdHKh', '臺中市', '烏日區', '慶光路29號', 0, 'RA000041'),
(42, '宋影鶴', '2015-10-09', 952987815, 'sergey7044@gmail.com', 'B172676167', '5H4MsNsR', '臺中市', '清水區', '自治路26號', 0, 'RA000042'),
(43, '嚴夏洋', '2014-10-18', 972514676, 'lena6305@gmail.com', 'Z293627497', '373E7q8f', '臺中市', '神岡區', '福成路7號', 0, 'RA000043'),
(44, '蔡奕錦', '2012-11-24', 963746210, 'dinwiddie4673@gmail.com', 'X128409948', 'Nn8kbyCQ', '臺中市', '大肚區', '文昌路26號', 0, 'RA000044'),
(45, '龔月林', '2010-06-18', 935607450, 'carly9986@yahoo.com', 'B292234890', '522DUmqE', '臺中市', '北區', '天津一街15號', 0, 'RA000045'),
(46, '曾勛璟', '2007-06-27', 989838704, 'robinson9577@icloud.com', 'B165385857', '23TSXuh6', '臺中市', '大里區', '仁化工三路23號', 0, 'RA000046'),
(47, '阮嫣宛', '1982-03-27', 912371835, 'kaylynn5375@gmail.com', 'Q224242435', '59ZtCc4a', '臺中市', '西屯區', '朝富二街20號', 0, 'RA000047'),
(48, '陳玫菲', '1973-05-02', 961441052, 'murphy9136@yahoo.com', 'L238073686', '37H7q9fV', '臺中市', '西區', '忠信街21號', 0, 'RA000048'),
(49, '陸舟韜', '2009-05-07', 934570939, 'pablo8236@gmail.com', 'S170185443', '3KFhJNC6', '臺中市', '西屯區', '福中七街8號', 0, 'RA000049'),
(50, '張信彌', '1977-09-09', 972840742, 'donald4276@hotmail.com', 'V130563555', '69q5x4S7', '臺中市', '太平區', '永豐路30號', 0, 'RA000050');

-- --------------------------------------------------------

--
-- 資料表結構 `userorder`
--
-- 建立時間： 2023-08-31 07:57:50
--

CREATE TABLE `userorder` (
  `ornumber` varchar(10) NOT NULL,
  `employeeid` varchar(5) NOT NULL,
  `week` int(1) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `weeks` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 資料表新增資料前，先清除舊資料 `userorder`
--

TRUNCATE TABLE `userorder`;
--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`employeeid`);

--
-- 資料表索引 `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `employeeinfo`
--
ALTER TABLE `employeeinfo`
  ADD PRIMARY KEY (`employeeid`);

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
-- 資料表索引 `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`uid`);

--
-- 資料表索引 `userorder`
--
ALTER TABLE `userorder`
  ADD PRIMARY KEY (`ornumber`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
