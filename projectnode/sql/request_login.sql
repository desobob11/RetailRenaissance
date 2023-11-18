delimiter $$
CREATE PROCEDURE request_login (
	IN eml TEXT(255),
    IN psswrd TEXT(255)
    )
BEGIN
SET @result = 0;
IF (EXISTS (SELECT 1 FROM `USER` WHERE email = eml AND password = psswrd))
	THEN SET @result = 1;
END IF;
SELECT @result;
END
$$
delimiter ;


