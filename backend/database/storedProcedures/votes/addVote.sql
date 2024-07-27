USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE addVote(
    @id VARCHAR(255),
    @choiceMade VARCHAR(255),

    @userId VARCHAR(255),
    @pollId VARCHAR(100)
    )
AS
BEGIN 
INSERT INTO votes(id,choiceMade,pollId,userId)
VALUES (@id,@choiceMade,@pollId,@userId)
END



