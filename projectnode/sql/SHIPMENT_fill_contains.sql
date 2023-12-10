DELIMITER $$
CREATE PROCEDURE SHIPMENT_fill_contains(
prod_id INT, num INT)

BEGIN
INSERT INTO `contains` VALUES (prod_id, (SELECT MAX(shipment_id) FROM `SHIPMENT`, num);
END
$$
DELIMITER ;




