delimiter $$
CREATE PROCEDURE request_login (
	IN eml TEXT(255),
    IN psswrd TEXT(255)
    )
BEGIN
SET @result = 0;
IF (EXISTS (SELECT 1 FROM `USER` WHERE email = eml AND password = psswrd))
	THEN SELECT @result := (SELECT user_id FROM `USER` WHERE email = eml AND password = psswrd) `@result`;
END IF;
SELECT @result;
END
$$
delimiter ;

DROP PROCEDURE request_login

CALL request_login('desmond@RR.ca', 'abc*123');





