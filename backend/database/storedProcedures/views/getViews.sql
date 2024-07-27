USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getViews

AS
BEGIN 
SELECT * FROM views WHERE isDeleted=0 AND isApproved=1
END;

