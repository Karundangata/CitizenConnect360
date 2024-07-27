USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE deleteVote(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE votes SET isDeleted=1 
WHERE id=@id
END 

