USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE updateVote(
    @id VARCHAR(255),
    @choiceMade VARCHAR(255)
)
AS
BEGIN
UPDATE votes SET choiceMade=@choiceMade
WHERE id=@id 
END;




