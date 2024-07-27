USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getUsers

AS
BEGIN 
SELECT * FROM users WHERE isDeleted=0
END;

