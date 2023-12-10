DELIMITER $$
CREATE PROCEDURE SHIPMENT_create_shipment_row(
usr_id INT,
wh_id INT)
BEGIN
    SET @result = 0;
    IF NOT EXISTS (SELECT 1 
					FROM WAREHOUSE
                    WHERE warehouse_id = wh_id)
                    OR  
                    NOT EXISTS (SELECT 1 
					FROM `USER`
                    WHERE user_id = usr_id)
					THEN SET @result = 0;
		ELSE
            INSERT INTO SHIPMENT VALUES (default, NOW(), '1900-01-01', usr_id, wh_id);
			SET @result = 1;
		END IF;

        
	IF @result = 1
	THEN
		SELECT @supplier_id := MOD(SECOND(NOW()), (SELECT COUNT(*) FROM supplier)) + 1;
		SELECT @shipment_id := MAX(shipment_id) FROM shipment;
		INSERT INTO supplies VALUES (@supplier_id, @shipment_id);
    END IF;
	SELECT @result;
END
$$
DELIMITER ;



