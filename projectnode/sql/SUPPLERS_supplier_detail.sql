DELIMITER $$
CREATE PROCEDURE SUPPLIERS_supplier_detail (
	suppl_id INT
)
BEGIN
	SELECT
		S.supplier_id `ID`,
        S.company_name `Company Name`,
        S.address `Address`,
        S.phone `Contact Number`,
        S.email `Contact Email`,
        (SELECT COUNT(*) FROM SUPPLIES S2
		WHERE S2.supplier_id =  S.supplier_id) `Shipments Received`,
        (SELECT AVG(DATEDIFF(S2.arrival_date, S2.ship_date))
			FROM shipment S2
            LEFT JOIN supplies S3
            ON S2.shipment_id = S3.shipment_id
            WHERE S3.supplier_id = S.supplier_id) `Average Shipping Delay`
        
	FROM SUPPLIER S
    WHERE supplier_id = suppl_id;
END
$$
DELIMITER ;


