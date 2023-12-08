import mysql.connector as msql
from faker import Faker
import random
import datetime
import pandas as pd
import numpy as np


# YOU NEED THE ABOVE PACKAGES TO USE THIS SCRIPT
# YOU ALSO NEED products.txt IN SAME DIRECTORY

n_warehouse = 10
n_branch = 15
n_user = 500
n_customer = 10000
n_supplier = 10
n_trans = 20000
n_products = 100
n_shipment = 500


def gen_customers(db, curs, n: int) -> None:
    print("Customer...")
    fk = Faker(["en_CA"])
    query = "INSERT INTO CUSTOMER (customer_id,phone_num,email,first_name,last_name,address) VALUES "
    for i in range(n):
        phone = fk.phone_number()
        email = fk.email()
        names = fk.name().split(" ")
        first = names[0]
        last = names[1]
        addr = fk.address()
        tup = "(default, '%s', '%s', '%s', '%s', '%s')," % (phone, email, first, last, addr)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()



def gen_warehouses(db, curs, n):
    print("Warehouses...")
    fk = Faker(["en_CA"])
    query = "INSERT INTO WAREHOUSE (warehouse_id,location,capacity) VALUES "
    for i in range(n):
        location = fk.address()
        capacity = random.randint(10000, 100000)
        tup = "(%d, '%s', %d)," % (i + 1, location, capacity)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()


def gen_branch(db, curs, n):
    print("Branches...")
    fk = Faker(["en_CA"])
    query = "INSERT INTO STORE_BRANCH (branch_id,location,warehouse_id) VALUES "
    for i in range(n):
        location = fk.address()
        warehouse = random.randint(1, n_warehouse)
        tup = "(%d, '%s', %s)," % (i + 1, location, warehouse)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()





def gen_user(db, curs, n: int) -> None:
    print("Users...")
    fk = Faker(["en_CA"])
    dt_start = datetime.datetime(2000, 1, 1)
    dt_end = datetime.datetime.now()
    manager_count = 1
    for i in range(n):
        manager_check = random.randint(1, 100)
        branch_id = random.randint(1, n_branch)
        hired_date = fk.date_between_dates(date_start=dt_start, date_end=dt_end)

        email = fk.email().split("@")[0] + "@RR.ca"
        names = fk.name().split(" ")
        first = names[0]
        last = names[1]
        password = fk.password()
        
        insert_user = "INSERT INTO `USER` (user_id,first_name,last_name,password,email) VALUES (%s, '%s', '%s', '%s', '%s');" % (i + 1, first, last, password, email)
        curs.execute(insert_user)

        insert_employee = "INSERT INTO EMPLOYEE (user_id, date_hired) VALUES (%s, '%s')" % (i + 1, hired_date)
        curs.execute(insert_employee)

        insert_works_at = "INSERT INTO WORKS_AT (user_id, branch_id) VALUES (%s, %s)" % (i + 1, branch_id)
        curs.execute(insert_works_at)

        if manager_check > 75:
            insert_manager = "INSERT INTO MANAGER (user_id, manager_id, branch_id) VALUES (%s, %s, %s)" % (i + 1, manager_count, branch_id)
            curs.execute(insert_manager)
            manager_count += 1


        db.commit()


def gen_product(db, curs, n):
    print("Products...")
    fk = Faker(["en_CA"])
    product_names = []
    with open("products.txt", "r") as file:
        product_names = file.readlines()

    query = "INSERT INTO PRODUCT (product_id,product_name,num_stock, price, branch_id) VALUES "
    for i in range(len(product_names)):
        name = product_names[i]
        num_stock = random.randint(100, 1000)
        price = float(random.randint(1, 1000)) - 0.01
        warehouse = random.randint(1, n_warehouse)
        tup = "(default, '%s', %s, %s, %s)," % (name, num_stock, price, warehouse)
        query += tup
    

    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()


def gen_supplier(db, curs, n):
    print("Suppliers...")
    fk = Faker(["en_CA"])
    query = "INSERT INTO SUPPLIER (supplier_id,company_name,address,phone,email) VALUES "
    for i in range(n):
        location = fk.address()
        name = fk.company()
        phone = fk.phone_number()
        email = fk.email()
        warehouse = random.randint(1, n_warehouse)
        tup = "(default, '%s', '%s', '%s', '%s')," % (name, location, phone, email)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()



def gen_transactions(db, curs, n):
    print("Transactions...")
    fk = Faker(["en_CA"])
    dt_start = datetime.datetime(2000, 1, 1)
    dt_end = datetime.datetime.now()
    statuses = ["Complete", "Pending", "Cancelled"]
    prod_table = query(curs, "SELECT * FROM PRODUCT;")
    for i in range(n):



        customer = random.randint(1, n_customer)
        user = random.randint(1, n_user)
        trans_date = fk.date_between_dates(date_start=dt_start, date_end=dt_end)
        status = statuses[random.randint(0, 2)]
        insert_trans = "INSERT INTO `TRANSACTION` (transaction_id, amount, transaction_date, customer_id, status) VALUES (%d, 0, '%s', %s, '%s');"% (i + 1, trans_date, customer, status)
        
        curs.execute(insert_trans)

        insert_order = "INSERT INTO `ORDER` (transaction_id, user_id, order_status) VALUES (%d, %d, '%s');" %  (i + 1, user, status)
        curs.execute(insert_order)



        
        num_unique_prods = random.randint(1, 10)
        prods = []
        n_prods = []

        # get products to buy
        while len(prods) < num_unique_prods:
            prod_id = random.randint(1, n_products)
            if prod_id not in prods:
                prods.append(prod_id)

        while len(n_prods) < num_unique_prods:
            n_prods.append(random.randint(1, 10))

        amount = 0
        for j in range(num_unique_prods):
            price = prod_table[prod_table["product_id"] == prods[j]]["price"].values[0]
            amount += price * n_prods[j]
            insert_requires = "INSERT INTO `REQUIRES` (transaction_id, product_id, num_prods) VALUES (%d, %d, %d);" %  (i + 1, prods[j], n_prods[j])
            curs.execute(insert_requires)

        update = "UPDATE `TRANSACTION` SET amount=%s WHERE transaction_id=%d;" % (amount, i + 1)
        curs.execute(update)


    db.commit()


def gen_shipments(db, curs, n):
    print("Shipments...")
    fk = Faker(["en_CA"])
    dt_start = datetime.datetime(2000, 1, 1)
    dt_end = datetime.datetime.now()
    for i in range(n):
        n_managers = query(curs, "SELECT COUNT(*) FROM MANAGER;").values[0][0]


        ship_date = fk.date_between_dates(date_start=dt_start, date_end=dt_end)
        arr_date = fk.date_between_dates(date_start=ship_date, date_end=dt_end)
        user = random.randint(1, n_managers)
        warehouse = random.randint(1, n_warehouse)
        supplier = random.randint(1, n_supplier)
        insert_ship = "INSERT INTO SHIPMENT (shipment_id, ship_date, arrival_date, user_id, warehouse_id) VALUES (%d, '%s', '%s', %s, %s);"% (i + 1, ship_date, arr_date, user, warehouse)
        curs.execute(insert_ship)

        insert_supplies = "INSERT INTO SUPPLIES (supplier_id, shipment_id) VALUES (%d, %d);" %  (supplier, i + 1)
        curs.execute(insert_supplies)

    
        num_unique_prods = random.randint(1, 10)
        prods = []
        n_prods = []

        # get products to buy
        while len(prods) < num_unique_prods:
            prod_id = random.randint(1, n_products)
            if prod_id not in prods:
                prods.append(prod_id)

        while len(n_prods) < num_unique_prods:
            n_prods.append(random.randint(1, 10))

        for j in range(num_unique_prods):
            insert_contains = "INSERT INTO CONTAINS (product_id, shipment_id, num_prod) VALUES (%d, %d, %d);" %  (prods[j], i + 1, n_prods[j])
            curs.execute(insert_contains)


    db.commit()




    

def query(curs, query):
    curs.execute(query)
    return pd.DataFrame(curs.fetchall(), columns=[i[0] for i in curs.description])








def main():

    db = msql.connect(
        host="localhost",
        user="root",
        password="Cam1pos2!",
        database="rr"
    )
    curs = db.cursor()

    
    gen_customers(db, curs, n_customer)
    gen_warehouses(db, curs, n_warehouse)
    gen_branch(db, curs, n_branch)
    gen_user(db, curs, n_user)
    gen_product(db, curs, 0)
    gen_supplier(db, curs, n_supplier)
    gen_transactions(db, curs, n_trans)
    gen_shipments(db, curs, n_shipment)






if __name__ == "__main__":
    main()