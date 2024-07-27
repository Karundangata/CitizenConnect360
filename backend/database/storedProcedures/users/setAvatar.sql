USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE setAvatar(
    @id VARCHAR(255),
    @avatar VARCHAR(255)
)
AS
BEGIN
UPDATE users SET avatar=@avatar
WHERE id=@id
END;

