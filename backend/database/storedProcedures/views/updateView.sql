USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE updateView(
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
UPDATE views SET id=@id, userId=@userId, title=@title, description=@description, body=@body, location=@location, imageUrl=@imageUrl,isModified=1
WHERE id=@id
END;



