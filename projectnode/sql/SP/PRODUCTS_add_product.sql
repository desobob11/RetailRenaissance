DELIMITER $$
CREATE PROCEDURE PRODUCTS_add_product (
	p_name TEXT(255),
    n_stock TEXT(255),
    prce DECIMAL(10,2),
    brnch_id INT)
    BEGIN
    
    IF NOT EXISTS (SELECT 1 
					FROM STORE_BRANCH
                    WHERE branch_id = brnch_id)
                    THEN SELECT 0;
		ELSE
            INSERT INTO PRODUCT VALUES (default, p_name, n_stock, prce, brnch_id);
			SELECT 1;
	END IF;
    END
    

$$
DELIMITER ;

CALL PRODUCTS_add_product ('Hammer', 100, 9.99, 1);

SELECT * FROM PRODUCT;