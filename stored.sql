-- Best selling products

DELIMITER $$
CREATE PROCEDURE `best_selling_products`(
    IN `product_name` VARCHAR(255),
    IN `num_stock` INT,
    IN `price` DECIMAL(10,2),
    IN `num_sales` INT
)
BEGIN
    SELECT * FROM PRODUCT
    ORDER BY num_sales DESC;
END$$
DELIMITER ;

-- Latest transactions
DELIMITER $$
CREATE PROCEDURE 'latest_transactions'(
    IN 'transaction_id' INT
    IN 'transaction_date' DATE
    IN 'amount' DECIMAL(10,2)
)
BEGIN 
    SELECT * FROM TRANSACTION
    ORDER BY transaction_id DESC;
END$$
DELIMITER ;

-- Transaction Detail

DELIMITER $$
CREATE PROCEDURE 'transaction_detail'(
    IN 'transaction_id' INT
    IN 'product_id' INT
    IN 'product_name' VARCHAR(255)
    IN 'price' DECIMAL(10,2)
)
BEGIN
    SELECT * FROM REQUIRES
    LEFT JOIN PRODUCT
    ON PRODUCT.product_id = REQUIRES.product_id
    AND REQUIRES.transaction_id = transaction_id;
END$$
DELIMITER ;

-- Recently trending products

DELIMITER $$
CREATE PROCEDURE 'recently_trending_products'(
    IN 'product_name' VARCHAR(255)
    IN 'price' DECIMAL(10,2)
)
BEGIN
    SELECT * FROM PRODUCT
    ORDER BY (SELECT COUNT (REQUIRES.product_id)
                FROM REQUIRES
                LEFT JOIN TRANSACTION
                ON REQUIRES.transaction_id = TRANSACTION.transaction_id
                WHERE REQUIRES.product_id = PRODUCT.product_id
                AND DATEDIFF(NOW(), TRANSACTION.Date) <= 7) DESC;
END$$
DELIMITER ;
