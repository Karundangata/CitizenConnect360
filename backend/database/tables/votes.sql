USE citizenConnect;

GO
CREATE TABLE pollVotes (
    id VARCHAR(255) PRIMARY KEY,
    choiceMade VARCHAR(255) NOT NULL,
    isDeleted INT DEFAULT 0,

    userId VARCHAR(255) FOREIGN KEY REFERENCES users(id),
    pollId VARCHAR(255) FOREIGN KEY REFERENCES polls(id)
)
