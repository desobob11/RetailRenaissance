DELIMITER $$
CREATE PROCEDURE REPORTS_line_graph (prod_id INT)
BEGIN

SET @first := MAKEDATE(YEAR(NOW()), 1);
SET @last := CAST(NOW() AS DATE);
SET @i := @first;
CREATE TEMPORARY TABLE calendar (
	dt DATE
);

WHILE @i <= @last DO
	INSERT INTO calendar (dt) VALUES (@i);
    SET @i := DATE_ADD(@i, INTERVAL 1 DAY);
END WHILE;

SELECT 
	MONTH(c.dt) `Month`,
	#DATE_FORMAT(c.dt, '%Y-%m-%d') `Transaction Date`,
	SUM(r.num_prods) `Units Sold`
FROM calendar c
LEFT JOIN `TRANSACTION` T
ON c.dt = T.transaction_date
LEFT JOIN REQUIRES r
ON r.transaction_id = T.transaction_id
AND r.product_id = prod_id
GROUP BY MONTH(c.dt)
ORDER BY MONTH(c.dt);
DROP TABLE calendar;
END
$$
DELIMITER ;

