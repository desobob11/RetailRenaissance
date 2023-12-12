DELIMITER $$
CREATE PROCEDURE REPORTS_sum_orders()
BEGIN
SET @latest := (SELECT MAX(transaction_date) FROM `TRANSACTION`);
SET @result := (SELECT CONCAT('$',FORMAT(SUM(amount),2,'en_US')) `Amount`
FROM `TRANSACTION`
WHERE DATEDIFF(@latest, transaction_date) <= 30);
SELECT @result;
END
$$
DELIMITER ;

