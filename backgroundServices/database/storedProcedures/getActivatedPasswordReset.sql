USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getActivatedPasswordReset

AS
BEGIN 
SELECT * FROM users WHERE passwordReset=1
END;


