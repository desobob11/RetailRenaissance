--====================================================
--  Placeholders
--====================================================

INSERT INTO USER (first_name, last_name, password, email)
VALUES ('Tim', 'Kim', 'timkim@email.com', 'passwordtim'),
('Desmond', 'OBrian', 'desmondobrian@email.com', 'passworddesmond'),
('Victor', 'Campos', 'victorcampos@email.com', 'passwordvictor');

INSERT INTO TRANSACTION (transaction_date, amount, method, status, customer_id)
VALUES ('2023-10-12', 100.00, 'Credit', 'COMPLETE', 1),
('2023-10-12', 100.00, 'DEBIT', 'INCOMPLETE', 2),
('2023-10-12', 100.00, 'Credit', 'COMPLETE', 3);

INSERT INTO ORDER (order_date, total_amount, customer_id, transaction_id, order_status)
VALUES ('2023-10-12', 100.00, 1, 1, 'COMPLETE'),
('2023-10-12', 100.00, 2, 2, 'INCOMPLETE'),
('2023-10-12', 100.00, 3, 3, 'PENDING');

INSERT INTO SUPPLIER (company_name, contact_number, email, address)
VALUES ('Amazon', '1234567890', 'amazon@email.com', '123 Street NW'),
('Walmart', '1234567890', 'walmart@email.com', '123 Street NW');
('Best Buy', '1234567890', 'bestbuy@email.com', '123 Street NW');

INSERT INTO PRODUCT (product_name, num_stock, price, status)
VALUES ('Apple', 100, 1.00, 'AVAILABLE'),
('Banana', 100, 1.00, 'AVAILABLE'),
('Orange', 100, 1.00, 'AVAILABLE');

INSERT INTO WAREHOUSE (address)
VALUES ('123 Street NW'),
('123 Street NW'),
('123 Street NW');

INSERT INTO STORE_BRANCH (warehouse_id)
VALUES (1),
(2),
(3);

INSERT INTO SHIPMENT (status, warehouse_id)
VALUES ('COMPLETE', 1),
('COMPLETE', 2),
('COMPLETE', 3);

INSERT INTO SUPPLIES (supplier_id, shipment_id)
VALUES (1, 1),
(2, 2),
(3, 3);

INSERT INTO CONTAINS (product_id, shipment_id)
VALUES (1, 1),
(2, 2),
(3, 3);

INSERT INTO REQUIRES (transaction_id, product_id, num_prod)
VALUES (1, 1, 1),
(2, 2, 2),
(3, 3, 3);

INSERT INTO EMPLOYEE (date_hired, user_id)
VALUES ('2023-10-12', 1),
('2023-10-12', 2),
('2023-10-12', 3);

INSERT INTO MANAGER (branch_id, user_id)
VALUES (1, 1),
(2, 2),
(3, 3);
