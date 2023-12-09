DELIMITER $$

CREATE PROCEDURE `GetSalesDataForLineGraph`(
    IN `startDate` DATE,
    IN `endDate` DATE
)
BEGIN
    SELECT 
        DATE(transaction_date) AS `SaleDate`, 
        SUM(amount) AS `TotalSales`
    FROM TRANSACTION
    WHERE transaction_date BETWEEN startDate AND endDate
    GROUP BY DATE(transaction_date)
    ORDER BY `SaleDate`;
END $$

DELIMITER ;
