USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getVote(
    @id VARCHAR(255)
)

AS
BEGIN 
SELECT * FROM votes WHERE id=@id
END



