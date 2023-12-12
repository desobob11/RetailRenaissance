DELIMITER $$
CREATE PROCEDURE SUPPLIERS_shipment_breakdown (ship_id INT)
BEGIN

SELECT 
	S.shipment_id `ID`,
    P.product_id `Product ID`,
    P.product_name `Product Name`,
    C.num_prod `Count of Product`,
    (C.num_prod * P.price) `Cost per Product`
	FROM
    shipment S
    LEFT JOIN `contains` C
    ON S.shipment_id = C.shipment_id
    LEFT JOIN product P
    ON P.product_id = C.product_id
	WHERE S.shipment_id = ship_id
    GROUP BY S.shipment_id, P.product_id, P.product_name, C.num_prod;
END
$$
DELIMITER ;
    
