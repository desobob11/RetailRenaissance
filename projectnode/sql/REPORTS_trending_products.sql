DELIMITER $$
CREATE PROCEDURE REPORTS_trending_products ()
BEGIN
SET @latest_date := (SELECT MAX(transaction_date) FROM `TRANSACTION`);
SELECT 
	p.product_id `ID`,
	p.product_name `Name`, 
    p.price `Price`,
    SUM(num_prods) `Sold`
FROM PRODUCT p
INNER JOIN REQUIRES r
ON r.product_id = p.product_id
INNER JOIN TRANSACTION t
ON t.transaction_id = r.transaction_id
AND DATEDIFF(@latest_date, t.transaction_date) <= 90
GROUP BY p.product_name, p.price, p.product_id
ORDER BY SUM(num_prods) DESC;
END
$$
DELIMITER ;

