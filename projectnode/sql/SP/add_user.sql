-- Add user using isManager flag
delimiter $$

CREATE PROCEDURE add_user (
	IN fname TEXT(255),
    IN lname TEXT(255),
    IN psswrd TEXT(255),
    IN eml TEXT(255),
    IN isManager INT,
    IN brnch_id INT
    )
BEGIN
INSERT INTO USER
VALUES (default, fname, lname, psswrd, eml);

SELECT @max_id := (SELECT MAX(user_id) FROM `USER`);


INSERT INTO EMPLOYEE
VALUES (@max_id, NOW());


IF	isManager = 1
	THEN INSERT INTO MANAGER VALUES (@max_id, default, brnch_id);
END IF;
END
$$
delimiter ;


 

 
