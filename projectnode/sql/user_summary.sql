DELIMITER $$
CREATE PROCEDURE user_summary ()
BEGIN
	SELECT 
		U.user_id `ID`,
        CONCAT(U.last_name, ', ', U.first_name) `Name`,
        CAST(E.date_hired AS DATE) `Hiring Date`,
        CASE
			WHEN EXISTS (SELECT 1 FROM MANAGER M WHERE U.user_id = M.user_id) THEN 1
            ELSE 0
        END `isManager`
	
    FROM USER U
	LEFT JOIN EMPLOYEE E
    ON E.user_id = U.user_id;
END
$$
DELIMITER ;
