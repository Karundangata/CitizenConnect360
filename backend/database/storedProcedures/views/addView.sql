USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE addView(
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @title VARCHAR(50),
    @description VARCHAR(100),
    @body VARCHAR(255),
    @location VARCHAR(50),
    @imageUrl VARCHAR(250)

)
AS
BEGIN 
INSERT INTO views(id,userId,title,description,body,location,imageUrl )
VALUES (@id,@userId,@title,@description,@body,@location,@imageUrl)
END



