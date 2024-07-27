USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getPoll(
    @id VARCHAR(255)
)

AS
BEGIN 
SELECT * FROM polls WHERE id=@id AND isApproved=1 AND isOpen=1
END;

