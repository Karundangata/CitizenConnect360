USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE updateDeletedUsers(
    @id VARCHAR(255)
)

AS
BEGIN
    UPDATE users
    SET isDeleted=2
    WHERE id = @id;
END;


