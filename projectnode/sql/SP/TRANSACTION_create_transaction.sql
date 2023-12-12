DELIMITER $$
CREATE PROCEDURE TRANSACTION_create_transaction (
	amt DECIMAL(10,2),
    cust_id INT
    )
    BEGIN
    IF NOT EXISTS (SELECT 1 
					FROM CUSTOMER
                    WHERE customer_id = cust_id)
                    THEN SELECT 0;
		ELSE
            INSERT INTO TRANSACTION VALUES (default, amt, NOW(), cust_id, 'active');
			SELECT MAX(transaction_id) FROM transaction;
	END IF;
    END
    

$$
DELIMITER ;










