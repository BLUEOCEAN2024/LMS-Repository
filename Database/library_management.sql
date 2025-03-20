CREATE DATABASE library_management;

USE library_management;

-- Table for storing user data
drop table tbl_users;
CREATE TABLE tbl_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('LIBRARIAN', 'MEMBER') DEFAULT 'MEMBER',
  profilepicture VARCHAR(255),
  isActive BOOLEAN DEFAULT TRUE
);

select * from tbl_users;


-- Table for password reset tokens
drop table tbl_password_reset_tokens;
CREATE TABLE tbl_password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expiry_date DATETIME NOT NULL
);

select * from tbl_password_reset_tokens;