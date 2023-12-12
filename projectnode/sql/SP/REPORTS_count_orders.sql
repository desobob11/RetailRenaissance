DELIMITER $$
CREATE PROCEDURE REPORTS_count_orders()
BEGIN
SET @latest := (SELECT MAX(transaction_date) FROM `TRANSACTION`);
SET @result := (SELECT COUNT(*)
FROM `TRANSACTION`
WHERE DATEDIFF(@latest, transaction_date) <= 30);
SELECT @result;
END
$$
DELIMITER ;

CALL REPORTS_count_orders

