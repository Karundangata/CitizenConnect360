USE citizenConnect;

GO
CREATE TABLE incidents (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    location VARCHAR(50) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    isDeleted INT DEFAULT 0,
    isApproved INT DEFAULT 1,
    -- too allow viewing instantly then admin can revoke late on


    
    userId VARCHAR(255) FOREIGN KEY REFERENCES users(id),
)

