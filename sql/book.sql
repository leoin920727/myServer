-- 評價假資料
INSERT INTO evaluate (ornumber ,employeeid, efficiency, clean, careful, manner) VALUES 
('426' ,'RA001', 5, 5, 3, 4),
('436' ,'RA001', 3, 4, 5, 4),
('426' ,'RA001', 4, 4, 3, 5),
('326' ,'RA002', 5, 2, 4, 3),
('226' ,'RA002', 5, 5, 5, 4),
('266' ,'RA002', 5, 3, 2, 3),
('223' ,'RA003', 5, 3, 4, 5),
('434' ,'RA003', 5, 5, 3, 3),
('452' ,'RA003', 4, 2, 5, 4),
('236' ,'RA003', 2, 4, 3, 4),
('442' ,'RA004', 5, 5, 3, 5),
('132' ,'RA004', 2, 3, 4, 4),
('116' ,'RA005', 4, 5, 3, 4),
('126' ,'RA005', 3, 3, 5, 3),
('146' ,'RA006', 5, 2, 4, 4),
('163' ,'RA006', 3, 5, 5, 4),
('168' ,'RA006', 3, 4, 5, 5),
('221' ,'RA006', 2, 4, 3, 5);

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
('RA006', 2, '2023-09-19');

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

-- 查詢滿檔的日期時段(不指定人員)
SET @EmployeeLimit = (SELECT COUNT(*) FROM employeeinfo);
SELECT A.time, A.date FROM
(SELECT `time`, `date`, COUNT(*) AS record_count
FROM attendance
WHERE `date` >= DATE_ADD(CURDATE(), INTERVAL 1 day) AND `date` < DATE_ADD(CURDATE(), INTERVAL 2 MONTH)
GROUP BY `time`, `date`
ORDER BY `date`) AS A
WHERE A.record_count = @EmployeeLimit;
