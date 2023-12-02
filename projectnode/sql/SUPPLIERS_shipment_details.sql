DELIMITER $$
CREATE PROCEDURE SUPPLIERS_shipment_details (
	suppl_id INT
)
BEGIN
SELECT 	S2.shipment_id `ID`,
		S.supplier_id `Supplier ID`,
		DATE_FORMAT(S2.ship_date, '%Y-%m-%d')`Shipment Date`,
		DATE_FORMAT(S2.arrival_date, '%Y-%m-%d')`Arrival Date`,
        S2.user_id `User ID`,
        S2.warehouse_id `Warehouse ID`
FROM supplies S
INNER JOIN shipment S2
ON S.shipment_id = S2.shipment_id
AND S.supplier_id = suppl_id;
END
$$
DELIMITER ;

