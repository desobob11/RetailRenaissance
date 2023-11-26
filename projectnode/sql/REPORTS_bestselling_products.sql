DELIMITER $$
CREATE PROCEDURE REPROTS_bestselling_products (prod_id INT)
BEGIN

WITH sales AS (
SELECT 
    product_name `Product`, 
    num_stock `Total Order`, 
    price `Price`,
    num_sales = (SELECT SUM(num_prods)
                FROM REQUIRES R
                WHERE R.product_id = P.product_id)

    FROM PRODUCT P)
SELECT * FROM sales ORDER BY num_sales DESC;

END
$$
DELIMITER ;


