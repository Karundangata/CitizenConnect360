USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE addIncident(
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @title VARCHAR(50),
    @description VARCHAR(100),
    @body VARCHAR(255),
    @location VARCHAR(50),
    @imageUrl VARCHAR(255)

)
AS
BEGIN 
INSERT INTO incidents(id,userId,title,description,body,location,imageUrl)
VALUES (@id,@userId,@title,@description,@body,@location,@imageUrl)
END



