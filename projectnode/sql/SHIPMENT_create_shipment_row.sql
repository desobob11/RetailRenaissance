DELIMITER $$
CREATE PROCEDURE SHIPMENT_create_shipment_row(
usr_id INT,
wh_id INT)
BEGIN
    SET @result = 0;
    IF NOT EXISTS (SELECT 1 
					FROM WAREHOUSE
                    WHERE warehouse_id = wh_id)
                    THEN SELECT @result;
		ELSE
            INSERT INTO SHIPMENT VALUES (default, NOW(), '1900-01-01', usr_id, wh_id);
			SET @result = 1;
            SELECT @result;
		END IF;
END
$$
DELIMITER ;

