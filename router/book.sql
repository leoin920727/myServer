
-- 評價假資料
INSERT INTO evaluate (ornumber ,employeeid, efficiency, clean, careful, manner) VALUES 
('426' ,'RA001', 2, 5, 3, 4),
('436' ,'RA001', 3, 4, 5, 4),
('426' ,'RA001', 4, 4, 3, 5),
('326' ,'RA002', 2, 2, 4, 3),
('226' ,'RA002', 5, 5, 2, 4),
('223' ,'RA003', 5, 3, 4, 5),
('434' ,'RA003', 5, 5, 3, 3),
('452' ,'RA003', 2, 2, 5, 4),
('236' ,'RA003', 2, 4, 3, 4),
('442' ,'RA004', 5, 5, 3, 5),
('132' ,'RA004', 2, 3, 4, 4),
('116' ,'RA005', 4, 5, 3, 4),
('126' ,'RA005', 3, 3, 5, 3),
('146' ,'RA006', 5, 2, 4, 4),
('163' ,'RA006', 3, 5, 5, 4),
('221' ,'RA006', 2, 4, 3, 5);

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