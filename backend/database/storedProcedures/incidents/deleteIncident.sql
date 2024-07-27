USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE deleteIncident(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE incidents SET isDeleted=1 
WHERE id=@id
END 

