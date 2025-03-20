package com.example.lms_backend.service;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.repository.BookRepository;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
       
    // Method to find a book by title
    public Book findByTitle(String title) {
//        Optional<Book> book = bookRepository.findByTitle(title);
//        return book.orElse(null);  // Return the book if found, otherwise return null

    	return bookRepository.findByTitle(title);
    }

    public void deleteBookByID(int book_id) {
        bookRepository.deleteById(book_id);
    }

    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
    
    public Optional<Book> updateBook(int book_id, Book updatedBook) {
        Optional<Book> existingBook = bookRepository.findById(book_id);

        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setIsbn(updatedBook.getIsbn());
            book.setGenre(updatedBook.getGenre());
            book.setYear_published(updatedBook.getYear_published());
            book.setUpdated_by(updatedBook.getUpdated_by());

            Date currentDate = new Date();   
            book.setUpdated_dt(currentDate);
            return Optional.of(bookRepository.save(book));
        }
        return Optional.empty();
    }
    
}