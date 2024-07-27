USE citizenConnect;
GO
CREATE OR ALTER PROCEDURE getChat(
    @id VARCHAR(255)
)   
AS
BEGIN
SELECT * FROM aiChats WHERE id=@id AND isDeleted=0
END 
