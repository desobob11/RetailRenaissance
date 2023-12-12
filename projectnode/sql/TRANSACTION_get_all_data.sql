DELIMITER $$ 
CREATE PROCEDURE `TRANSACTION_get_all_data` ()
BEGIN
SELECT * FROM 
rr.transaction
LEFT JOIN customer C
ON transaction.customer_id = C.customer_id;
END $$ 
DELIMITER ;