DELIMITER $$
CREATE PROCEDURE TRANSACTION_create_requires (
    prod_id INT,
    numprod INT
    )
    BEGIN
SET FOREIGN_KEY_CHECKS=0;
            INSERT INTO REQUIRES  VALUES((SELECT MAX(transaction_id) FROM TRANSACTION), prod_id, numprod);
			SELECT 1;
SET FOREIGN_KEY_CHECKS=1;

    END
$$
DELIMITER ;

CALL TRANSACTION_create_requires(1, 10);


SELECT * FROM TRANSACTION;
SELECT * FROM REQUIRES;



