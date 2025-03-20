CREATE DATABASE lms_db;
-----------------------------------
use lms_db;
select * from tbl_users;
select * from tbl_books where title = 'The forever court';
select * from tbl_borrow_hist;
select * from tbl_roles;
-----------------------------------
-- Table: Users
drop table tbl_users;
CREATE TABLE tbl_users (
    user_id 		int PRIMARY KEY AUTO_INCREMENT,
    name 			nvarchar(100)  NOT NULL,
    pwd				nvarchar(50)  NOT NULL,
    identity		nvarchar(50)  ,
    email 			nvarchar(50)  ,
    phone 			nvarchar(50)  ,
	role ENUM('LIBRARIAN', 'MEMBER') DEFAULT 'MEMBER',
    created_by		nvarchar(50) ,
    created_dt		date
--     CONSTRAINT pk_user_id PRIMARY KEY (user_id)
);

INSERT INTO tbl_users (user_id,name, pwd, identity, email, phone, member_effective_from, created_by,created_dt) 
VALUES 
(1,'karen', 'karen', 'S202501A', 'karen@hotmail.com', '91234567', '2025-01-01', 'system',  NOW()),
(2,'sam', 'sam', 'S202501B', 'sam@hotmail.com', '81234567', '2025-01-01', 'system',  NOW()),
(3,'andy', 'andy', 'S202501C', 'andy@hotmail.com', '71234567', '2025-01-01', 'system',  NOW())
;

INSERT INTO tbl_users (name, pwd, identity, email, phone, created_by,created_dt) 
VALUES 
('karen', 'karen', 'S202501A', 'karen@hotmail.com', '91234567', 'system',  NOW()),
('sam', 'sam', 'S202501B', 'sam@hotmail.com', '81234567', 'system',  NOW()),
('andy', 'andy', 'S202501C', 'andy@hotmail.com', '71234567', 'system',  NOW())
;
commit;

select * from tbl_users;
-- truncate table tbl_users;

-- Table: Books
drop table tbl_books;
CREATE TABLE tbl_books (
    book_id 		int PRIMARY KEY AUTO_INCREMENT,
    title 			nvarchar(255) NOT NULL,
    author 			nvarchar(255) NOT NULL,
    ISBN			nvarchar(255),	
    genre 			nvarchar(50),
    year_published 	int,
    status			nvarchar(50)	default 'available',
    created_by		nvarchar(50)  NOT NULL,
    created_dt		date,    
    updated_by		nvarchar(50),
    updated_dt		date
);

ALTER TABLE table_name AUTO_INCREMENT = 1;

INSERT INTO tbl_books (book_id,title, author, ISBN, genre, year_published, created_by,created_dt) 
VALUES 
(1,'What You Are Looking for Is in the Library', 'Aoyama, Michiko', '9780733426094', 'Fiction', 2023, 'system',  NOW()),
(2,'The forever court', 'Rudden, Dave', '9783161484100', 'Fiction', 2017,  'system',  NOW()),
(3,'Lula Dean''s Little Library of Banned Books', 'Miller, Kirsten', '9783453082502', 'Fiction', 2024, 'system',  NOW())
;

INSERT INTO tbl_books (title, author, ISBN, genre, year_published, created_by,created_dt) 
VALUES 
('What You Are Looking for Is in the Library', 'Aoyama, Michiko', '9780733426094', 'Fiction', 2023, 'system',  NOW()),
('The forever court', 'Rudden, Dave', '9783161484100', 'Fiction', 2017,  'system',  NOW()),
('Lula Dean''s Little Library of Banned Books', 'Miller, Kirsten', '9783453082502', 'Fiction', 2024, 'system',  NOW())
;

commit;

select * from tbl_books;
-- truncate table tbl_books;

-- Table: Borrow_Hist
drop table tbl_borrow_hist;
CREATE TABLE tbl_borrow_hist (
    hist_id         INT AUTO_INCREMENT PRIMARY KEY,
    book_id         INT NOT NULL,
    user_id         INT NOT NULL,
    borrow_dt       DATE ,
    return_dt       DATE ,
    status			nvarchar(50)	default 'available',
    created_by      NVARCHAR(50) NOT NULL,
    created_dt      DATE
--     CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES tbl_books(book_id),
--     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
);

INSERT INTO tbl_borrow_hist (hist_id,book_id, user_id, borrow_dt, return_dt, created_by,created_dt) 
VALUES 
(1, 1, 1, '2025-01-2', '2025-02-2', 'system',  NOW()),
(2, 2, 2, '2025-01-2', '2025-02-2', 'system',  NOW()),
(3, 3, 3, '2025-01-2', '2025-02-2', 'system',  NOW())
;

INSERT INTO tbl_borrow_hist (book_id, user_id, borrow_dt, return_dt, created_by,created_dt) 
VALUES 
( 1, 1, '2025-01-2', '2025-02-2', 'system',  NOW()),
( 2, 2, '2025-01-2', '2025-02-2', 'system',  NOW()),
( 3, 3, '2025-01-2', '2025-02-2', 'system',  NOW())
;
commit;

select * from tbl_borrow_hist ;
-- delete from tbl_borrow_hist where hist_id in (1,2,3);
-- truncate table tbl_borrow_hist;

select bh1_0.hist_id,bh1_0.book_id,bh1_0.borrow_dt,bh1_0.created_by,bh1_0.created_dt,bh1_0.return_dt,bh1_0.status,bh1_0.user_id from tbl_borrow_hist bh1_0 where bh1_0.book_id=3;
select b1_0.book_id,b1_0.author,b1_0.created_by,b1_0.created_dt,b1_0.genre,b1_0.isbn,b1_0.status,b1_0.title,b1_0.updated_by,b1_0.updated_dt,b1_0.year_published from tbl_books b1_0 where b1_0.book_id=3;

-- Table: Roles
drop table tbl_roles;
CREATE TABLE tbl_roles (
    role_id         INT AUTO_INCREMENT PRIMARY KEY,
    role_name       NVARCHAR(50) NOT NULL,
    role_access		NVARCHAR(50) NOT NULL,
    created_by      NVARCHAR(50) NOT NULL,
    created_dt      DATE
);

INSERT INTO tbl_roles (role_name, role_access, created_by, created_dt) 
VALUES 
('Librarian', 'Admin', 'system',  NOW()),
('Member', 'Member', 'system',  NOW());

select * from tbl_roles;
