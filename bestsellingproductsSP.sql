DELIMITER $$

CREATE PROCEDURE GetBestSellingProducts()
BEGIN
    WITH sales AS (
    SELECT 
        product_name AS `Product`, 
        num_stock AS `Total Order`, 
        price AS `Price`,
        (SELECT COUNT(product_id)
         FROM REQUIRES R
         WHERE R.product_id = P.product_id) AS num_sales
    FROM PRODUCT P)
    SELECT * FROM sales ORDER BY num_sales DESC;
END $$

DELIMITER ;
