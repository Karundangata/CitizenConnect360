USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getUserName(
    @id VARCHAR(255)
)
AS
BEGIN 
SELECT name,email FROM users WHERE id=@id
END;

