USE citizenConnect;

GO
CREATE OR ALTER PROCEDURE addUser(
    @id VARCHAR(255),
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @role VARCHAR(50)
)
AS
BEGIN 
INSERT INTO users(id,name,email,password,role)
VALUES (@id,@name,@email,@password,@role)
END

