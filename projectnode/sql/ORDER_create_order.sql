DELIMITER $$
CREATE PROCEDURE ORDER_create_order (
    usr_id INT
    )
    BEGIN
    
    IF NOT EXISTS (SELECT 1 
					FROM USER
                    WHERE user_id = usr_id)
                    THEN SELECT 0;
		ELSE
SET FOREIGN_KEY_CHECKS=0;
            INSERT INTO `ORDER` VALUES((SELECT MAX(transaction_id) FROM TRANSACTION), usr_id, 'active');
SET FOREIGN_KEY_CHECKS=1;
	END IF;


    END
$$
DELIMITER ;

