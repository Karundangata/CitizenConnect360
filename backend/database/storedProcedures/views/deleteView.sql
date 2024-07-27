USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE deleteView(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE views SET isDeleted=1 
WHERE id=@id
END 
