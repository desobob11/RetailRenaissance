import mysql.connector as msql
from faker import Faker
import random
import datetime


n_warehouse = 10
n_branch = 15
n_user = 500
n_customer = 10000



def gen_customers(db, curs, n: int) -> None:
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
    fk = Faker(["en_CA"])
    query = "INSERT INTO WAREHOUSE (warehouse_id,location,capacity) VALUES "
    for i in range(n):
        location = fk.address()
        capacity = random.randint(10000, 100000)
        tup = "(%d, '%s', '%s')," % (i + 1, location, capacity)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()


def gen_branch(db, curs, n):
    fk = Faker(["en_CA"])
    query = "INSERT INTO STORE_BRANCH (branch_id,location,warehouse_id) VALUES "
    for i in range(n):
        location = fk.address()
        warehouse = random.randint(1, n_warehouse)
        tup = "(%d, '%s', '%s')," % (i + 1, location, warehouse)
        query += tup
    
    query = query[:len(query)-1] + ";"
    curs.execute(query)
    db.commit()





def gen_user(db, curs, n: int) -> None:
    fk = Faker(["en_CA"])
    dt_start = datetime.datetime(2000, 1, 1)
    dt_end = datetime.datetime.now()
    manager_count = 1
    for i in range(n):
        manager_check = random.randint(0, 1)
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

        if manager_check:
            insert_manager = "INSERT INTO MANAGER (user_id, manager_id, branch_id) VALUES (%s, %s, %s)" % (i + 1, manager_count, random.randint(1, n_branch))
            curs.execute(insert_manager)
            manager_count += 1


        db.commit()




    







def main():

    db = msql.connect(
        host="localhost",
        user="dobrien",
        password="abc*123",
        database="rr"
    )
    curs = db.cursor()

   # gen_customers(db, curs, n_customer)
    #gen_user(db, curs, n_user);
    #gen_warehouses(db, curs, n_warehouse)
    #gen_branch(db, curs, n_branch)
    gen_user(db, curs, 50);



if __name__ == "__main__":
    main()