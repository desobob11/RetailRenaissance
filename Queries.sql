CREATE SCHEMA RR;

CREATE TABLE RR.CUSTOMER (
    customer_id INT NOT NULL AUTO_INCREMENT,
    phone_num TEXT,
    email TEXT,
    first_name TEXT,
    last_name TEXT,
    PRIMARY KEY (customer_id)
);

CREATE TABLE RR.WAREHOUSE (
    warehouse_id INT,
    location TEXT,
    capacity INT,
    PRIMARY KEY (warehouse_id)
);

CREATE TABLE RR.TRANSACTION (
    transaction_id INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(15, 2),
    transaction_date DATETIME,
    customer_id INT,
    `status` TEXT,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (customer_id) REFERENCES RR.CUSTOMER(customer_id)
);



CREATE TABLE RR.USER (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    email TEXT,
    PRIMARY KEY (user_id)
);

CREATE TABLE RR.EMPLOYEE (
    user_id INT,
    date_hired DATE,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES RR.USER(user_id)
);

CREATE TABLE RR.ORDER (
    transaction_id INT,
    user_id INT,
    order_status TEXT,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (transaction_id) REFERENCES RR.TRANSACTION(transaction_id),
    FOREIGN KEY (user_id) REFERENCES RR.EMPLOYEE(user_id)

);


CREATE TABLE RR.STORE_BRANCH (
    branch_id INT NOT NULL AUTO_INCREMENT,
    location TEXT,
    warehouse_id INT,
    PRIMARY KEY (branch_id),
    FOREIGN KEY (warehouse_id) REFERENCES RR.WAREHOUSE(warehouse_id)
);

CREATE TABLE RR.MANAGER (
    user_id INT,
    manager_id INT,
    branch_id INT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES RR.USER(user_id),
    FOREIGN KEY (branch_id) REFERENCES RR.STORE_BRANCH(branch_id)
);


CREATE TABLE RR.WORKS_AT (
    user_id INT,
    branch_id INT,
    PRIMARY KEY (user_id, branch_id),
    FOREIGN KEY (user_id) REFERENCES RR.EMPLOYEE(user_id),
    FOREIGN KEY (branch_id) REFERENCES RR.STORE_BRANCH(branch_id)
);


CREATE TABLE RR.PRODUCT (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name TEXT,
    num_stock INT,
    price DECIMAL(15, 2),
    branch_id INT,
    PRIMARY KEY (product_id),
    FOREIGN KEY (branch_id) REFERENCES RR.STORE_BRANCH(branch_id)
);

CREATE TABLE RR.REQUIRES (
    transaction_id INT,
    product_id INT,
    num_prods INT,
    PRIMARY KEY (transaction_id, product_id),
    FOREIGN KEY (transaction_id) REFERENCES RR.ORDER(transaction_id),
    FOREIGN KEY (product_id) REFERENCES RR.PRODUCT(product_id)
);


CREATE TABLE RR.SHIPMENT (
    shipment_id INT NOT NULL AUTO_INCREMENT,
    ship_date DATETIME,
    arrival_date DATE,
    user_id INT,
    warehouse_id INT,
    PRIMARY KEY (shipment_id),
    FOREIGN KEY (user_id) REFERENCES RR.MANAGER(user_id)
);

CREATE TABLE RR.CONTAINS (
    product_id INT,
    shipment_id INT,
    PRIMARY KEY (product_id, shipment_id),
    FOREIGN KEY (product_id) REFERENCES RR.PRODUCT(product_id),
    FOREIGN KEY (shipment_id) REFERENCES RR.SHIPMENT(shipment_id)
);


CREATE TABLE RR.SUPPLIER (
    supplier_id INT NOT NULL AUTO_INCREMENT,
    company_name TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    PRIMARY KEY (supplier_id)
);

CREATE TABLE RR.SUPPLIES (
    supplier_id INT,
    shipment_id INT,
    PRIMARY KEY (supplier_id, shipment_id),
    FOREIGN KEY (supplier_id) REFERENCES RR.SUPPLIER(supplier_id),
    FOREIGN KEY (shipment_id) REFERENCES RR.SHIPMENT(shipment_id)
);
