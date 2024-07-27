USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE getIncidents

AS
BEGIN 
SELECT * FROM incidents WHERE isDeleted=0 AND isApproved=1
END;

