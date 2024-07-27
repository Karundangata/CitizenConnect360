USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getSpecificPollVotes(
    @id VARCHAR(255)
)

AS
BEGIN 
SELECT * FROM votes WHERE pollId=@id AND isDeleted=0
END;

