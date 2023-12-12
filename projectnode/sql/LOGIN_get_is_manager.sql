DELIMITER $$
CREATE PROCEDURE LOGIN_get_is_manager (usr_id INT)
BEGIN
IF EXISTS (SELECT 1 FROM manager WHERE user_id = usr_id)
THEN SELECT manager_id `@result` FROM manager WHERE user_id = usr_id;
ELSE SELECT 0;
END IF;
END
$$
DELIMITER ;

CALL LOGIN_get_is_manager (505)

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `Product_get_all_data`()
BEGIN
SELECT * FROM rr.product;
END$$
DELIMITER ;
DROP PROCEDURE Product_get_all_data