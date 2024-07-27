USE citizenConnect;

GO
CREATE TABLE views (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(100) NOT NULL,
    body VARCHAR(255) NOT NULL,
    location VARCHAR(50) NOT NULL,
    imageUrl VARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
    isDeleted INT DEFAULT 0,
    isApproved INT DEFAULT 1,
    -- too allow viewing instantly then admin can revoke late on
    isModified INT DEFAULT 0,

    userId VARCHAR(255) FOREIGN KEY REFERENCES users(id)
)





