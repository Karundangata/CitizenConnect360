USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE sensorView(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE views SET isApproved=0 
WHERE id=@id
END 



