USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getIncident(
    @id VARCHAR(255)
)

AS
BEGIN 
SELECT * FROM incidents WHERE id=@id AND isApproved=1 AND isDeleted=0
END;

