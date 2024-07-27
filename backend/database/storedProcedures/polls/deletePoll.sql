USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE deletePoll(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE polls SET isDeleted=1 
WHERE id=@id
END 

