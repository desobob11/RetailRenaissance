DELIMITER $$
CREATE PROCEDURE SHIPMENT_get_prods_warehouse(
wh_id INT)
BEGIN
SELECT 
	CONCAT(P.product_id, '. ', P.product_name) `Product`
FROM PRODUCT P
LEFT JOIN STORE_BRANCH B
ON P.branch_id = B.branch_id
LEFT JOIN WAREHOUSE W
ON W.warehouse_id = B.warehouse_id
WHERE W.warehouse_id = wh_id;
END
$$
DELIMITER ;




