USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE activatePasswordReset(
    @id VARCHAR(255)
)
AS
BEGIN
UPDATE users SET passwordReset=1
WHERE id=@id
END;

