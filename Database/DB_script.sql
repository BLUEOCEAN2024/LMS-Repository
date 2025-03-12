CREATE DATABASE lms_db;
use lms_db;
-----------------------------------
-- Table: Users
CREATE TABLE tbl_users (
    user_id 		int AUTO_INCREMENT,
    user_name 		nvarchar(100)  NOT NULL,
    identity_id		nvarchar(50)  NOT NULL,
    email 			nvarchar(50)  NOT NULL,
    phone 			nvarchar(50)  NOT NULL,
    member_effective_from 	date not null,
    created_by		nvarchar(50)  NOT NULL,
    created_dt		date,
    CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);
-- Table: Books
drop table tbl_books;
CREATE TABLE tbl_books (
    book_id 		int AUTO_INCREMENT PRIMARY KEY,
    title 			nvarchar(255) NOT NULL,
    author 			nvarchar(255) NOT NULL,
    ISBN			nvarchar(255),	
    genre 			nvarchar(50),
    year_published 	int,
    created_by		nvarchar(50)  NOT NULL,
    created_dt		date
);

INSERT INTO tbl_books (title, author, ISBN, genre, year_published, created_by,created_dt) 
VALUES 
('What You Are Looking for Is in the Library', 'Aoyama, Michiko', '9780733426094', 'Fiction', 2023, 'system',  NOW()),
('The forever court', 'Rudden, Dave', '9783161484100', 'Fiction', 2017, 'system',  NOW()),
('Lula Dean''s Little Library of Banned Books', 'Miller, Kirsten', '9783453082502', 'Fiction', 2024, 'system',  NOW())
;

select * from tbl_books;
