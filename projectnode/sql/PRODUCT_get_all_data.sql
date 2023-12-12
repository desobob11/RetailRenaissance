DELIMITER $$ 
CREATE PROCEDURE `Product_get_all_data` ()
BEGIN
SELECT * FROM rr.product;
END $$ 
DELIMITER ;