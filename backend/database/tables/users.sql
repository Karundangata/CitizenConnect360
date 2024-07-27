USE citizenConnect;

GO
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    isEmailSent INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    awaitApproval INT DEFAULT 0
)

