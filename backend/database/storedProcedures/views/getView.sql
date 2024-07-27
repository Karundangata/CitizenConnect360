USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getView(
    @id VARCHAR(255)
)

AS
BEGIN 
SELECT * FROM views WHERE id=@id AND isApproved=1 AND isDeleted=0
END;

