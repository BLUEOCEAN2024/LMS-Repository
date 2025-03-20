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

	
    public BorrowHistory searchBorrowHistoryByBookId(int bookid) {
    	return borrowhistoryRepository.findByBookid(bookid);
    }

	
    public List<BorrowHistory> searchBorrowHistoryByUserId(int userid) {
    	return borrowhistoryRepository.findByUserid(userid);
    }
	
    public boolean borrowBook(int bookid, int userid) {
        Optional<Book> bookOpt = bookRepository.findById(bookid);
        if (bookOpt.isPresent()) {
            Book book = bookOpt.get();
            if ("available".equals(book.getStatus()) || book.getStatus() == null) {
            book.setStatus("borrowed");
            bookRepository.save(book);

            // Log the transaction
            BorrowHistory borrowHistory = new BorrowHistory();
            borrowHistory.setBook_id(bookid);
            borrowHistory.setUser_id(userid);
            borrowHistory.setStatus("borrowed");
            Date currentDate = new Date();
            borrowHistory.setBorrow_dt(currentDate);
            borrowHistory.setCreated_dt(currentDate);
            borrowhistoryRepository.save(borrowHistory);

            return true;
            }
        }
        return false;
    }

    public boolean returnBook(int bookid, int userid) {

        Optional<BorrowHistory> borrowHistoryOpt = Optional.of(borrowhistoryRepository.findByBookid(bookid));
        Optional<Book> bookOpt = bookRepository.findById(bookid);
        
        if (borrowHistoryOpt.isPresent() && bookOpt.isPresent()) {
        	BorrowHistory borrowHistory = borrowHistoryOpt.get();
            Book book = bookOpt.get();
            if ("borrowed".equals(borrowHistory.getStatus()) &&
	    		"borrowed".equals(book.getStatus()) && 
	    		borrowHistory.getUser_id() == userid) {
            	borrowHistory.setStatus("returned");
                Date currentDate = new Date();
                borrowHistory.setReturn_dt(currentDate);
                borrowHistory.setCreated_dt(currentDate);
                borrowhistoryRepository.save(borrowHistory);
                

                book.setStatus("available");
                bookRepository.save(book);
                return true;
            }
        }
        return false;
    }
}
