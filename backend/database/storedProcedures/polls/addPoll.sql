USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE addPoll(
    @id VARCHAR(255),
    @userId VARCHAR(255),
    @title VARCHAR(50),
    @choices NVARCHAR(MAX)
)
AS
BEGIN 
INSERT INTO polls(id,userId,title,choices)
VALUES (@id,@userId,@title,@choices)
END
