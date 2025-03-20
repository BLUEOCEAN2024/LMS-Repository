CREATE DATABASE library_management;

USE library_management;

-- Table for storing user data
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('LIBRARIAN', 'MEMBER') DEFAULT 'MEMBER',
  profile_picture VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);

-- Table for password reset tokens
CREATE TABLE password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expiry_date DATETIME NOT NULL
);