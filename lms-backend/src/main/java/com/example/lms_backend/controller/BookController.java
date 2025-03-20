package com.example.lms_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.repository.BookRepository;
import com.example.lms_backend.service.BookService;

import java.util.Date;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173") // integration with React frontend 
public class BookController {
    @Autowired
    private BookService bookService;
    
    @Autowired // Automatically injects an instance of EmployeeRepository
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @PostMapping("/addBook") 
    public Book addBook(@RequestBody Book book) {
    	// Create a Date object to get the current date
        Date currentDate = new Date();       
    	book.setCreated_dt(currentDate);
    	
        return bookService.addBook(book);
    }
    
    @GetMapping("/getBookById/{id}") 
    public Book getBookById(@PathVariable("id") int book_id) {
        return bookRepository.findById(book_id).orElse(null);
    }
        
    @GetMapping("/getBookByTitle/{title}")
    public Book getBookByTitle(@PathVariable("title") String title) {
        return bookService.findByTitle(title);  // Call the service method
    }
    
    @DeleteMapping("/deleteBookById/{id}") 
    public void deleteBookById(@PathVariable("id") int book_id) {    	
        bookService.deleteBookByID(book_id);
    }
    
    @PutMapping("/updateBook/{id}") 
    public ResponseEntity<String>  updateBook(@PathVariable("id") int book_id, @RequestBody Book book) {
        Optional<Book> updatedBook = bookService.updateBook(book_id, book);

        if (updatedBook.isPresent()) {
            return ResponseEntity.ok("Book updated successfully");
        } else {
            return ResponseEntity.status(404).body("Book not found");
        }
    }
    
    @PutMapping("/borrowBook/{id}") 
    public List<Book>  borrowBook(@PathVariable("id") int book_id, @RequestBody Book book) {  
    	   
    	book.setStatus("Borrowed");
//    	bookService.updateBook(id, book);
    	bookRepository.save(book);
        return bookService.getAllBooks();

    }
    
    @PutMapping("/returnBook/{id}") 
    public List<Book>  returnBook(@PathVariable("id") int book_id, @RequestBody Book book) {  

    	book.setStatus("Available");
//    	bookService.updateBook(book_id, book);
    	bookRepository.save(book);
        return bookService.getAllBooks();
    }
}