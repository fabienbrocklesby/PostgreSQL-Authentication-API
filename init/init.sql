CREATE TABLE users (
    id SERIAL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    verifycode VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE
);
