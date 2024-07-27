USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE closePoll(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE polls SET isOpen=0 
WHERE id=@id
END 

