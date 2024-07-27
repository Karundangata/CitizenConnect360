USE citizenConnect;

GO
CREATE TABLE openAi (
    id VARCHAR(255) PRIMARY KEY,
    query VARCHAR(255) NOT NULL,
    response VARCHAR(255),    
    createdAt DATETIME DEFAULT GETDATE(),
    isDeleted INT DEFAULT 0,

    userId VARCHAR(255) FOREIGN KEY REFERENCES users(id),
    viewId VARCHAR(255) FOREIGN KEY REFERENCES views(id),
    incidentId VARCHAR(255) FOREIGN KEY REFERENCES incidents(id)
)





