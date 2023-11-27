DELIMITER $$
CREATE PROCEDURE CUSTOMERS_get_all_data()
BEGIN
SELECT 
	c.*,
	COALESCE((SELECT SUM(amount) FROM
    `Transaction` T2 WHERE
    T2.customer_id = c.customer_id
    AND T2.status = 'Complete'), 0) `sales`,
    (SELECT COUNT(*) FROM
    `Transaction` T2 WHERE
    T2.customer_id = c.customer_id
    AND T2.status = 'cancelled') `cancelled`,
	(SELECT COUNT(*) FROM
    `Transaction` T2 WHERE
    T2.customer_id = c.customer_id
    AND T2.status = 'Complete') `completed`
FROM CUSTOMER c
LEFT JOIN `Transaction` T
ON c.customer_id = T.transaction_id
GROUP BY c.customer_id, c.phone_num, c.email, c.first_name, c.last_name, c.address;
END
$$
DELIMITER ;


