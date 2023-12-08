DELIMITER$$

CREATE PROCEDURE GetTrendingProducts()
BEGIN
    WITH sales AS (
    SELECT 
        P.product_name AS `Product`, 
        P.num_stock AS `Total Order`, 
        P.price AS `Price`,
        (SELECT SUM(R.num_prods)
         FROM REQUIRES R
         WHERE R.product_id = P.product_id) AS num_sales
    FROM PRODUCT P
    )
    SELECT * FROM sales ORDER BY num_sales DESC;
END //

DELIMITER ;
