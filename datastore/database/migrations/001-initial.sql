CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    firstName VARCHAR NOT NULL,
    lastName VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);
CREATE TABLE products(
    id VARCHAR PRIMARY KEY,
    title VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    receivedAt INTEGER NOT NULL,
    company VARCHAR NOT NULL
);