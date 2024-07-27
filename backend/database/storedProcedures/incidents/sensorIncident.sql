USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE sensorIncident(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE incidents SET isApproved=0 
WHERE id=@id
END 


