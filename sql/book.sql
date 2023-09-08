-- DB修改
CREATE TABLE `attendance` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `employeeid` varchar(5) NOT NULL,
  `mode` int(1) DEFAULT NULL,
  `time` int(1) NOT NULL,
  `date` date NOT NULL,
  `week` int(1) NOT NULL
)

CREATE TABLE `priceList` (
  `weekNumber` int(11) NOT NULL PRIMARY KEY,
  `price` int(11) NOT NULL
)

CREATE TABLE `orderlist` (
  `ornumber` varchar(10) NOT NULL PRIMARY KEY,
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
  `note` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 評價假資料
INSERT INTO evaluate (ornumber ,employeeid, efficiency, clean, careful, manner) VALUES 
('23091215QA' ,'RA001', 5, 5, 3, 4),
('23090914BV' ,'RA001', 3, 4, 5, 4),
('23092308RG' ,'RA001', 4, 4, 3, 5),
('23091106SA' ,'RA002', 5, 2, 4, 3),
('23092018OP' ,'RA002', 5, 5, 5, 4),
('23092018AD' ,'RA002', 5, 3, 2, 3),
('23091112PK' ,'RA003', 5, 3, 4, 5),
('23091212LO' ,'RA003', 5, 5, 3, 3),
('23091517KU' ,'RA003', 4, 2, 5, 4),
('23090913KI' ,'RA003', 2, 4, 3, 4),
('23091616RF' ,'RA004', 5, 5, 3, 5),
('23091609PM' ,'RA004', 2, 3, 4, 4),
('23091614MK' ,'RA005', 4, 5, 3, 4),
('23091612HD' ,'RA005', 3, 3, 5, 3),
('23090919HS' ,'RA006', 5, 2, 4, 4),
('23090919SC' ,'RA006', 3, 5, 5, 4),
('23091615CE' ,'RA006', 3, 4, 5, 5),
('23091008YJ' ,'RA006', 2, 4, 3, 5);

-- 員工出勤狀態假資料
INSERT INTO attendance (`employeeid`, `time`, `date`) VALUES 
('RA001', 0, '2023-09-09'),
('RA002', 0, '2023-09-09'),
('RA003', 0, '2023-09-09'),
('RA004', 0, '2023-09-09'),
('RA005', 0, '2023-09-09'),
('RA006', 0, '2023-09-09'),
('RA001', 1, '2023-09-09'),
('RA002', 1, '2023-09-09'),
('RA003', 1, '2023-09-09'),
('RA004', 1, '2023-09-09'),
('RA005', 1, '2023-09-09'),
('RA006', 1, '2023-09-09'),
('RA001', 2, '2023-09-09'),
('RA002', 2, '2023-09-09'),
('RA003', 2, '2023-09-09'),
('RA004', 2, '2023-09-09'),
('RA005', 2, '2023-09-09'),
('RA006', 2, '2023-09-09'),
('RA001', 0, '2023-09-23'),
('RA002', 0, '2023-09-23'),
('RA003', 0, '2023-09-23'),
('RA004', 0, '2023-09-23'),
('RA005', 0, '2023-09-23'),
('RA006', 0, '2023-09-23'),
('RA001', 1, '2023-09-23'),
('RA002', 1, '2023-09-23'),
('RA003', 1, '2023-09-23'),
('RA004', 1, '2023-09-23'),
('RA005', 1, '2023-09-23'),
('RA006', 1, '2023-09-23'),
('RA001', 2, '2023-09-23'),
('RA002', 2, '2023-09-23'),
('RA003', 2, '2023-09-23'),
('RA004', 2, '2023-09-23'),
('RA005', 2, '2023-09-23'),
('RA006', 2, '2023-09-23'),
('RA001', 0, '2023-09-30'),
('RA002', 0, '2023-09-30'),
('RA003', 0, '2023-09-30'),
('RA004', 0, '2023-09-30'),
('RA005', 0, '2023-09-30'),
('RA006', 0, '2023-09-30'),
('RA001', 1, '2023-09-30'),
('RA002', 1, '2023-09-30'),
('RA003', 1, '2023-09-30'),
('RA004', 1, '2023-09-30'),
('RA005', 1, '2023-09-30'),
('RA006', 1, '2023-09-30'),
('RA001', 2, '2023-09-30'),
('RA002', 2, '2023-09-30'),
('RA003', 2, '2023-09-30'),
('RA004', 2, '2023-09-30'),
('RA005', 2, '2023-09-30'),
('RA006', 2, '2023-09-30'),
('RA001', 2, '2023-09-16'),
('RA002', 2, '2023-09-16'),
('RA003', 2, '2023-09-16'),
('RA004', 2, '2023-09-16'),
('RA005', 2, '2023-09-16'),
('RA006', 2, '2023-09-16'),
('RA006', 1, '2023-09-16'),
('RA001', 1, '2023-09-16'),
('RA002', 1, '2023-09-16'),
('RA003', 1, '2023-09-16'),
('RA004', 1, '2023-09-16'),
('RA005', 1, '2023-09-16'),
('RA001', 0, '2023-09-16'),
('RA002', 0, '2023-09-16'),
('RA003', 0, '2023-09-16'),
('RA004', 0, '2023-09-16'),
('RA005', 0, '2023-09-16'),
('RA006', 0, '2023-09-16'),
('RA001', 2, '2023-09-20'),
('RA002', 2, '2023-09-20'),
('RA003', 2, '2023-09-20'),
('RA004', 2, '2023-09-20'),
('RA005', 2, '2023-09-20'),
('RA006', 2, '2023-09-20'),
('RA001', 2, '2023-09-06'),
('RA002', 2, '2023-09-06'),
('RA003', 2, '2023-09-06'),
('RA004', 2, '2023-09-06'),
('RA005', 2, '2023-09-06'),
('RA006', 2, '2023-09-06'),
('RA001', 2, '2023-09-13'),
('RA002', 2, '2023-09-13'),
('RA003', 2, '2023-09-13'),
('RA004', 2, '2023-09-13'),
('RA005', 2, '2023-09-13'),
('RA006', 2, '2023-09-13'),
('RA001', 2, '2023-09-27'),
('RA002', 2, '2023-09-27'),
('RA003', 2, '2023-09-27'),
('RA004', 2, '2023-09-27'),
('RA005', 2, '2023-09-27'),
('RA006', 2, '2023-09-27'),
('RA003', 0, '2023-09-18'),
('RA006', 2, '2023-09-18'),
('RA003', 2, '2023-09-19'),
('RA001', 0, '2023-09-19'),
('RA004', 0, '2023-09-19'),
('RA006', 2, '2023-10-19'),
('RA001', 2, '2023-10-04'),
('RA002', 2, '2023-10-04'),
('RA003', 2, '2023-10-04'),
('RA004', 2, '2023-10-04'),
('RA005', 2, '2023-10-04'),
('RA006', 2, '2023-10-04');
('RA001', 1, '2023-09-11'),
('RA001', 1, '2023-09-18'),
('RA001', 1, '2023-09-25'),
('RA001', 1, '2023-10-02'),
('RA001', 0, '2023-09-18'),


-- 價目表資料
INSERT INTO `priceList` (`weekNumber`, `price`) VALUES 
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
--------------------------------------------------------------------------

-- 查詢員工各項能力評價平均值
SELECT p.employeeid, AVG(efficiency) as e1, AVG(clean) as e2, AVG(careful) as e3, AVG(manner) as e4 FROM employeeinfo as p LEFT JOIN evaluate as v ON p.employeeid=v.employeeid GROUP BY p.employeeid;

-- 查詢員工總評價
SELECT employeeid, ROUND((e1 + e2 + e3 + e4)/4,1) AS total_efficiency
FROM (
    SELECT p.employeeid,
           AVG(v.efficiency) AS e1,
           AVG(v.clean) AS e2,
           AVG(v.careful) AS e3,
           AVG(v.manner) AS e4
    FROM employeeinfo AS p
    LEFT JOIN evaluate AS v ON p.employeeid = v.employeeid
    GROUP BY p.employeeid
) AS new;

-- 查詢員工姓名、照片、總評分
SELECT
    info.name,
    info.photo,
    ROUND((score.e1 + score.e2 + score.e3 + score.e4) / 4, 1) AS total_efficiency
FROM
    employeeinfo AS info
LEFT JOIN
    (
        SELECT
            p.employeeid,
            AVG(v.efficiency) AS e1,
            AVG(v.clean) AS e2,
            AVG(v.careful) AS e3,
            AVG(v.manner) AS e4
        FROM
            employeeinfo AS p
        LEFT JOIN
            evaluate AS v ON p.employeeid = v.employeeid
        GROUP BY
            p.employeeid
    ) AS score
ON
    score.employeeid = info.employeeid;

-- 列出每個員工當前的出勤狀況(明日～兩個月內)
SELECT `time`, `date`, COUNT(*) AS record_count
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
GROUP BY `time`, `date`
ORDER BY `date`;

-- 查詢滿檔的日期時段
SET @EmployeeLimit = (SELECT COUNT(*) FROM employeeinfo);
SELECT A.time, A.date FROM
(SELECT `time`, `date`, COUNT(*) AS record_count
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
GROUP BY `time`, `date`
ORDER BY `date`) AS A
WHERE A.record_count = @EmployeeLimit;

SELECT A.time, A.date FROM 
(SELECT `time`, `date`
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
AND employeeid = ?
ORDER BY `date`) AS A   
