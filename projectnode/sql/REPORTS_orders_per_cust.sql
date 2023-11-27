DELIMITER $$
CREATE PROCEDURE REPORTS_orders_per_cust()
BEGIN
SET @latest := (SELECT MAX(transaction_date) FROM `TRANSACTION`);
SET @result := (SELECT COUNT(*)
FROM `TRANSACTION`
WHERE DATEDIFF(@latest, transaction_date) <= 30);
SELECT @result;
END
$$
DELIMITER ;

