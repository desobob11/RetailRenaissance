--====================================================
--  CPSC 471 Fall 2023
--    Progress Report 3 - Functional Design
--    Group G-15

--    Victor Campos UCID: 30106934
--    Timothy Kim UCID: 30116265
--    Desmond O’Brian UCID: 30064340
--====================================================



--====================================================
--  Beginning of queries
--====================================================
-- LOGIN QUERY
SELECT EXISTS (SELECT 1
                FROM USER
                WHERE email = @email
                AND password = @password)






-- Best selling products
;WITH sales AS (
SELECT 
    product_name `Prod6uct`, 
    num_stock `Total Order`, 
    price `Price`,
    num_sales = (SELECT COUNT(product_id)
                FROM REQUIRES R
                WHERE R.product_id = P.product_id)

    FROM PRODUCT P)
SELECT * FROM sales ORDER BY num_sales DESC


-- Trending products


;WITH sales AS (
SELECT 
    product_name `Product`, 
    num_stock `Total Order`, 
    price `Price`,
    num_sales = (SELECT SUM(num_prods)
                FROM REQUIRES R
                WHERE R.product_id = P.product_id)

    FROM PRODUCT P)
SELECT * FROM sales ORDER BY num_sales DESC






-- Latest transactions
SELECT 
    transaction_id `ID`,
    transaction_date `Date`,
    amount `Amount`
    FROM TRANSACTION
    ORDER BY transaction_id DESC 






-- Transaction Detail
SELECT
    R.transaction_id,
    P.product_id,
    P.product_name,
    P.price
    FROM REQUIRES R
    LEFT JOIN PRODUCT P
    ON P.product_id = R.product_id
    AND R.transaction_id = @transaction_id






-- Recently trending products
SELECT
    P.product_name, 
    P.price
    FROM PRODUCT P
    ORDER BY (SELECT COUNT (R.product_id)
                FROM REQUIRES R
                LEFT JOIN TRANSACTION T
                ON R.transaction_id = T.transaction_id
                WHERE R.product_id = P.product_id
                AND DATEDIFF(NOW(), T.Date) <= 7) DESC







-- Sum of sales in the last 7 days
SELECT 
    SUM(amount)
    FROM TRANSACTION
    WHERE DATEDIFF(NOW(), transaction_date) <= 7






-- Select orders based on status
SELECT
    O.transaction_id `Order ID`,
    T.transaction_date `Created`,
    C.first_name + C.last_name `Customer`,
    T.amount `Total`,
    S.supplier_id `Supplier ID`,
    S.comapny_name `SUPPLIER`,
    O.order_status `STATUS`

    FROM ORDER O
    LEFT JOIN TRANSACTION T
    ON O.transaction_id = O.transaction_id
    LEFT JOIN CUSTOMER C ON
    T.customer_id = C.customer_id
    LEFT JOIN REQUIRES R
    ON ON O.transaction_id = R.transaction_id
    LEFT JOIN CONTAINS C
    ON C.product_id = R.product_id
    LEFT JOIN SHIPMENT SH
    ON SH.shipment_id = C.shipment_id
    LEFT JOIN SUPPLES SUP
    ON SUP.shipment_id = SH.shipment_id
    LEFT JOIN SUPPLER
    ON SUPPLIER.supplier_id = SUPPLIES.supplier_id
    WHERE O.`order_status` = @status






    -- Order detail
    SELECT
    O.transaction_id `Order ID`,
    R.product_id `Product ID`,
    P.product_name `Product`,
    P.price `Price`,
    R.num_prod `QTY`,
    T.amount `Total`

    FROM ORDER O
    LEFT JOIN PRODUCT P
    ON O.product_id = P.product_id
    LEFT JOIN REQRUIRES R
    ON R.transaction_id = O.transaction_id
    LEFT JOIN TRANSACTION T
    ON O.transaction_id = T.transaction_id







-- Select transactions based on status
SELECT
    T.transaction_id `Order ID`,
    T.transaction_date `Created`,
    C.first_name + C.last_name `Customer`,
    T.amount `Total`,
    T.methopd `Payment Method`,
    S.supplier_id `Supplier ID`,
    S.comapny_name `SUPPLIER`,
    T.`status` `STATUS`


    FROM TRANSACTION T

    LEFT JOIN CUSTOMER C ON
    T.customer_id = C.customer_id
    LEFT JOIN REQUIRES R
    ON ON O.transaction_id = R.transaction_id
    LEFT JOIN CONTAINS C
    ON C.product_id = R.product_id
    LEFT JOIN SHIPMENT SH
    ON SH.shipment_id = C.shipment_id
    LEFT JOIN SUPPLES SUP
    ON SUP.shipment_id = SH.shipment_id
    LEFT JOIN SUPPLER
    ON SUPPLIER.supplier_id = SUPPLIES.supplier_id
    WHERE T.`status` = @status






    -- Cancel an order and transaction
    UPDATE TABLE ORDER
    SET order_status = 'Cancelled'
    WHERE transaction_id = @transation_id

    UPDATE TABLE TRANSACTION
    SET `status` = 'Cancelled'
    WHERE transaction_id = @transaction_id




    -- Transaction detail
    SELECT
    T.transaction_id `Order ID`,
    R.product_id `Product ID`,
    P.product_name `Product`,
    P.price `Price`,
    R.num_prod `QTY`, -- this is a new field that will be created, not in Relational diagram
    T.amount `Total`

    FROM TRANSACTION T
    LEFT JOIN REQRUIRES R
    ON R.transaction_id = O.transaction_id
    LEFT JOIN PRODUCT P
    ON P.product_id = R.product_id




-- User summary, will use an auto i
SELECT * FROM USER






-- Add user using isManager flag
INSERT INTO USER
VALUES (@first_name, @last_name, @password, @email)

INSERT INTO EMPLOYEE
VALUES (@date_hired)

IF @isManager = 1
 INSERT INTO isManager
 VALUES (@branch_id)
END IF





-- Delete user
DELETE FROM USER WHERE user_id = @user_id
DELETE FROM EMPLOYEE WHERE user_id = @user_id
DELETE FROM MANAGER WHERE user_id = @user_id






-- Products Summary
SELECT 
    P.`status` `Status`,
    P.product_name `Product Name`,
    P.product_id `Product ID`,
    P.num_stock `Current Stock`,
    P.price `Price`,
    B.branch_id `Branch ID`,
    S.company_name `Supplier`

    FROM PRODUCT P
    LEFT JOIN CONTAINS C
    ON P.product_id = C.product_id
    LEFT JOIN SHIPMENT SH
    ON SH.shipment_id = C.shipment_id
    LEFT JOIN WAREHOUSE W
    ON SH.warehouse_id = W.warehouse_id
    LEFT JOIN STORE_BRANCH B
    ON B.warehouse_id = W.warehouse_id
    LEFT JOIN SUPPLIES SUPL
    ON SUPL.shipment_id = SH.shipment_id
    LEFT JOIN SUPPLIER S
    ON S.supplier_id = SUPL.supplier_id






-- Select customer summary
    SELECT 
        customer_id `ID`,
        first_name + last_name `Name`,
        email `E-Mail`
        FROM CUSTOMER







-- Select customer detail based on selection (indiviudal scalars)
SELECT first_name + last_name `Name`
FROM CUSTOMER
WHERE customer_id = @selected

SELECT phone `Phone Number`
FROM CUSTOMER
WHERE customer_id = @selected

SELECT gender `Gender`
FROM CUSTOMER
WHERE customer_id = @selected

SELECT birthdate `Date of Birth`
FROM CUSTOMER
WHERE customer_id = @selected

SELECT member_since `Member Since`
FROM CUSTOMER
WHERE customer_id = @selected

SELECT address `Shipping Address`
FROM CUSTOMER
WHERE customer_id = @selected






-- select number of completed based on status
SELECT COUNT(*)
FROM TRANSACTION 
WHERE customer_id = @selected
AND `status` = @status






-- select sum of sales dollar amount with customer
SELECT CSUM(amount)
FROM TRANSACTION 
WHERE customer_id = @selected
AND `status` = 'Completed'




-- Select supplier summary
SELECT
    supplier_id `ID`,
    company_name `Company Name`,
    email `E-Mail`

    FROM SUPPLIER






-- Select supplier scalar values based on ID
SELECT company_name `Company Name`
FROM SUPPLIER
WHERE supplier_id = @selected
SELECT contact_number `Contact Number`
FROM SUPPLIER
WHERE supplier_id = @selected
SELECT email `E-Mail`
FROM SUPPLIER
WHERE supplier_id = @selected
SELECT address `Shipping Address`
FROM SUPPLIER
WHERE supplier_id = @selected







-- Select number of shipments from supplier based on status
SELECT COUNT(*)
FROM SHIPMENT SH
LEFT JOIN SUPPLIES SUPL
ON SUPL.shipment_id = SH.shipment_id
LEFT JOIN SUPPLIER S
ON S.supplier_id = SUPL.supplier_id
WHERE S.supplier_id = @selected
AND SH.`status` = @status

    
--====================================================
--  end of queries
--====================================================