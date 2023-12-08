DELIMITER $$

CREATE PROCEDURE GetLatestTransactions()
BEGIN
    SELECT 
        transaction_id AS `ID`,
        transaction_date AS `Date`,
        amount AS `Amount`
    FROM TRANSACTION
    ORDER BY transaction_id DESC;
END $$

DELIMITER ;
