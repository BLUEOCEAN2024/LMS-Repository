package com.example.lms_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	
//	public List<Book> findAll() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public Book save(Book book) {
//		// TODO Auto-generated method stub
//		return null;
//	}

    List<Book> findByTitle(String title);
//    Optional<Book> findById(int bookId);
    
	
}


