DELIMITER $$
CREATE PROCEDURE SUPPLIERS_supplier_summary ()
BEGIN
	select supplier_id `ID`,
			company_name `Company Name`
	FROM SUPPLIER;
END
$$
DELIMITER ;

