DELIMITER $$
CREATE PROCEDURE REPORTS_latest_transactions ()
BEGIN
SELECT 
	t.transaction_id `ID`,
		DATE_FORMAT(t.transaction_date, '%Y-%m-%d')`Transaction Date`,
    t.amount `Amount`,
    t.status `Status`
    
FROM TRANSACTION t
order by t.transaction_date DESC
LIMIT 30;
END
$$
DELIMITER ;
