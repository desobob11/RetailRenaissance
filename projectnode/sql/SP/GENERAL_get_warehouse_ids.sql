DELIMITER $$
CREATE PROCEDURE GENERAL_get_warehouse_ids()
BEGIN
SELECT warehouse_id `ID`
FROM WAREHOUSE
ORDER BY warehouse_id ASC;
END
$$
DELIMITER ;
