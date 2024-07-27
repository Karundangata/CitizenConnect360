USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE updateUser(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @role VARCHAR(255)
)
AS
BEGIN
UPDATE users SET name=@name, email=@email, password=@password, role=@role
WHERE id=@id
END;
