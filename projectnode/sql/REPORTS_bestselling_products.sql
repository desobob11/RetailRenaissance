DELIMITER $$
CREATE PROCEDURE REPORTS_bestselling_products ()
BEGIN
SELECT
	p.product_id `ID`,
	p.product_name `Name`, 
    SUM(num_prods) `Total sold`,
    p.price `Price`,
	p.num_stock `Current Stock`
FROM PRODUCT p
INNER JOIN REQUIRES r
ON r.product_id = p.product_id
GROUP BY p.product_name, p.price, p.num_stock, p.product_id
ORDER BY SUM(num_prods) DESC;
END
$$
DELIMITER ;

