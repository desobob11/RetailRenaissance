DELIMITER $$

CREATE PROCEDURE rr.USER_user_summary()
BEGIN
    -- Select all user details along with their role information (employee/manager)
    SELECT DISTINCT
        u.user_id,
        u.first_name,
        u.last_name,
        u.email,
        e.date_hired AS employee_date_hired,
        m.manager_id,
        m.branch_id AS manager_branch_id
    FROM
        user u
    LEFT JOIN employee e ON u.user_id = e.user_id
    LEFT JOIN manager m ON u.user_id = m.user_id;
END $$

DELIMITER ;
