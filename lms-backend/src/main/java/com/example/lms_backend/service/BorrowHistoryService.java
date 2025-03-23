package com.example.lms_backend.service;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.BorrowHistory;
import com.example.lms_backend.repository.BorrowHistoryRepository;
import com.example.lms_backend.repository.BookRepository;

@Service
public class BorrowHistoryService {
	
	String available = "available";
	String borrowed = "borrowed";
	String returned = "returned";
	String reserved = "reserved";
	String released = "released";
	
    @Autowired
    private BorrowHistoryRepository borrowhistoryRepository;
    
    @Autowired
    private BookRepository bookRepository;


	public List<BorrowHistory> getAllBorrowHistory() {
        return borrowhistoryRepository.findAll();
	}

//    public BorrowHistory addBorrowHistory(BorrowHistory borrowhistory) {
//        return borrowhistoryRepository.save(borrowhistory);
//    }

	
//    public BorrowHistory searchBorrowHistoryByBookId(int bookid) {
//    	return borrowhistoryRepository.findByBookid(bookid);
//    }

    public List<BorrowHistory> searchBorrowHistoryByBookId(int bookid) {
    	return borrowhistoryRepository.findByBookid(bookid);
    }
	
    public List<BorrowHistory> searchBorrowHistoryByUserId(int userid) {
    	return borrowhistoryRepository.findByUserid(userid);
    }
	
    public boolean borrowBook(int bookid, int userid) {
        Optional<Book> bookOpt = bookRepository.findById(bookid);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            if (available.equals(book.getStatus()) || book.getStatus() == null) {
            book.setStatus(borrowed);
            bookRepository.save(book);

            // Log the transaction
            BorrowHistory borrowHistory = new BorrowHistory();
            borrowHistory.setBook_id(bookid);
            borrowHistory.setUser_id(userid);
            borrowHistory.setStatus(borrowed);
            Date currentDate = new Date();
            borrowHistory.setBorrow_dt(currentDate);
            borrowHistory.setCreated_dt(currentDate);
            borrowhistoryRepository.save(borrowHistory);

            return true;
            }
        }
        return false;
    }

//    public boolean returnBook(int bookid, int userid) {
//
//        Optional<BorrowHistory> borrowHistoryOpt = Optional.of(borrowhistoryRepository.findByBookid(bookid));
//        Optional<Book> bookOpt = bookRepository.findById(bookid);
//        
//        if (borrowHistoryOpt.isPresent() && bookOpt.isPresent()) {
//        	BorrowHistory borrowHistory = borrowHistoryOpt.get();
//            Book book = bookOpt.get();
//            if (borrowed.equals(borrowHistory.getStatus()) &&
//            	borrowed.equals(book.getStatus()) && 
//	    		borrowHistory.getUser_id() == userid) {
//            	borrowHistory.setStatus(returned);
//                Date currentDate = new Date();
//                borrowHistory.setReturn_dt(currentDate);
//                borrowHistory.setCreated_dt(currentDate);
//                borrowhistoryRepository.save(borrowHistory);                
//
//                book.setStatus(available);
//                bookRepository.save(book);
//                return true;
//            }
//        }
//        return false;
//    }
    
    public boolean returnBook(int bookid, int userid) {
        // Get the list of borrow histories by book ID
        List<BorrowHistory> borrowHistoryList = (List<BorrowHistory>) borrowhistoryRepository.findByBookid(bookid);
        // Get the optional book by book ID
        Optional<Book> bookOpt = bookRepository.findById(bookid);
        
        // Check if the book exists
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            
            // Loop through each borrow history record
            for (BorrowHistory borrowHistory : borrowHistoryList) {
                // Check the conditions: book is borrowed, book status is borrowed, and the user matches
                if (borrowed.equals(borrowHistory.getStatus()) &&
                    borrowed.equals(book.getStatus()) &&
                    borrowHistory.getUser_id() == userid) {
                    
                    // Set the borrow history status to returned and update dates
                    borrowHistory.setStatus(returned);
                    Date currentDate = new Date();
                    borrowHistory.setReturn_dt(currentDate);
                    borrowHistory.setCreated_dt(currentDate);
                    
                    // Save the updated borrow history
                    borrowhistoryRepository.save(borrowHistory);
                    
                    // Set the book status to available
                    book.setStatus(available);
                    
                    // Save the updated book status
                    bookRepository.save(book);
                    
                    return true; // Return true indicating success
                }
            }
        }
        
        // If no matching borrow history or conditions are found, return false
        return false;
    }

    
    public boolean reserveBook(int bookid, int userid) {
        Optional<Book> bookOpt = bookRepository.findById(bookid);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            if (available.equals(book.getStatus()) || book.getStatus() == null) {
            book.setStatus(reserved);
            bookRepository.save(book);

            // Log the transaction
            BorrowHistory borrowHistory = new BorrowHistory();
            borrowHistory.setBook_id(bookid);
            borrowHistory.setUser_id(userid);
            borrowHistory.setStatus(reserved);
            Date currentDate = new Date();
            borrowHistory.setBorrow_dt(currentDate);
            borrowHistory.setCreated_dt(currentDate);
            borrowhistoryRepository.save(borrowHistory);

            return true;
            }
        }
        return false;
    }
    
//    public boolean borrowReservedBook(int bookid, int userid) {
//        Optional<BorrowHistory> borrowHistoryOpt = Optional.of(borrowhistoryRepository.findByBookid(bookid));
////        List<BorrowHistory> borrowHistoryList = (List<BorrowHistory>) borrowhistoryRepository.findByBookid(bookid);
//        Optional<Book> bookOpt = bookRepository.findById(bookid);
//        
//        if (borrowHistoryOpt.isPresent() && bookOpt.isPresent()) {
//        	BorrowHistory borrowHistory = borrowHistoryOpt.get();
//            Book book = bookOpt.get();
//            if (reserved.equals(borrowHistory.getStatus()) && 
//            	reserved.equals(book.getStatus()) && 
//	    		borrowHistory.getUser_id() == userid) {
//            	borrowHistory.setStatus(borrowed);
//                Date currentDate = new Date();
//                borrowHistory.setReturn_dt(currentDate);
//                borrowHistory.setCreated_dt(currentDate);
//                borrowhistoryRepository.save(borrowHistory);                
//
//                book.setStatus(available);
//                bookRepository.save(book);
//                return true;
//            }
//        }
//        return false;
//    }
    
    public boolean borrowReservedBook(int bookid, int userid) {
        List<BorrowHistory> borrowHistoryList = (List<BorrowHistory>) borrowhistoryRepository.findByBookid(bookid);
        Optional<Book> bookOpt = bookRepository.findById(bookid);

        // Check if book exists
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();

            // Loop through each BorrowHistory in the list
            for (BorrowHistory borrowHistory : borrowHistoryList) {
                // Check if the BorrowHistory matches the conditions
                if (reserved.equals(borrowHistory.getStatus()) && 
                    reserved.equals(book.getStatus()) && 
                    borrowHistory.getUser_id() == userid) {

                    // Update the borrow history and book statuses
                    borrowHistory.setStatus(borrowed);
                    Date currentDate = new Date();
                    borrowHistory.setReturn_dt(currentDate);
                    borrowHistory.setCreated_dt(currentDate);
                    borrowhistoryRepository.save(borrowHistory);

                    // Update the book status
                    book.setStatus(available);
                    bookRepository.save(book);

                    return true; // Success
                }
            }
        }

        // If no matching borrow history found or book does not exist, return false
        return false;
    }

    
//    public boolean releaseReservedBook(int bookid, int userid) {
//
//        List<BorrowHistory> borrowHistoryList = (List<BorrowHistory>) borrowhistoryRepository.findByBookid(bookid);
////        Optional<BorrowHistory> borrowHistoryOpt = Optional.of(borrowhistoryRepository.findByBookid(bookid));
//        Optional<Book> bookOpt = bookRepository.findById(bookid);
//        
//        if (borrowHistoryOpt.isPresent() && bookOpt.isPresent()) {
//        	BorrowHistory borrowHistory = borrowHistoryOpt.get();
//            Book book = bookOpt.get();
//            if (reserved.equals(borrowHistory.getStatus()) && 
//            	reserved.equals(book.getStatus()) && 
//	    		borrowHistory.getUser_id() == userid) {
//            	borrowHistory.setStatus(released);
//                Date currentDate = new Date();
//                borrowHistory.setReturn_dt(currentDate);
//                borrowHistory.setCreated_dt(currentDate);
//                borrowhistoryRepository.save(borrowHistory);                
//
//                book.setStatus(available);
//                bookRepository.save(book);
//                return true;
//            }
//        }
//        return false;
//    }
    
    public boolean releaseReservedBook(int bookid, int userid) {
        List<BorrowHistory> borrowHistoryList = (List<BorrowHistory>) borrowhistoryRepository.findByBookid(bookid);
        Optional<Book> bookOpt = bookRepository.findById(bookid);

        // Check if the book exists
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();

            // Loop through each BorrowHistory in the list
            for (BorrowHistory borrowHistory : borrowHistoryList) {
                // Check if the BorrowHistory matches the conditions
                if (reserved.equals(borrowHistory.getStatus()) && 
                    reserved.equals(book.getStatus()) && 
                    borrowHistory.getUser_id() == userid) {

                    // Update the BorrowHistory status to 'released'
                    borrowHistory.setStatus(released);
                    Date currentDate = new Date();
                    borrowHistory.setReturn_dt(currentDate);
                    borrowHistory.setCreated_dt(currentDate);
                    borrowhistoryRepository.save(borrowHistory);

                    // Update the book status to 'available'
                    book.setStatus(available);
                    bookRepository.save(book);

                    return true; // Success
                }
            }
        }

        // If no matching BorrowHistory found or book does not exist, return false
        return false;
    }

}
