USE citizenConnect;
GO
CREATE OR ALTER PROCEDURE deleteChat(
    @id VARCHAR(255)
)   
AS
BEGIN
UPDATE aiChats SET isDeleted=1 
WHERE id=@id
END 

