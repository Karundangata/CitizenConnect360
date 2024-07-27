USE citizenConnect;
GO
CREATE OR ALTER PROCEDURE addChat(
    @id VARCHAR(255),
    @query VARCHAR(255),
    @response VARCHAR(255),

    @userId VARCHAR(255),
    @viewId VARCHAR(255)
    )
AS
BEGIN 
INSERT INTO aiChats(id,query,response,userId,viewId)
VALUES (@id,@query,@response,@userId,@viewId)
END



