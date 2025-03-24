package com.example.lms_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.BorrowHistory;
import com.example.lms_backend.service.BorrowHistoryService;

@RestController
@RequestMapping("/api/borrowhistory")
@CrossOrigin(origins = "http://localhost:5173") // integration with React frontend 
public class BorrowHistoryController {

    @Autowired
    private BorrowHistoryService borrowhistoryService;

    @GetMapping
    public List<BorrowHistory> getBorrowHistory() {
        return borrowhistoryService.getAllBorrowHistory();
    }
//
//    @PostMapping
//    public BorrowHistory addBorrowHistory(@RequestBody BorrowHistory borrowhistory) {
//        return borrowhistoryService.addBorrowHistory(borrowhistory);
//    }
    
    @GetMapping("/searchBorrowHistoryByBookId") 
    public List<BorrowHistory>  searchBorrowHistoryByBookId(@RequestParam int bookid) {
        return borrowhistoryService.searchBorrowHistoryByBookId(bookid);
    }
    
    @GetMapping("/searchBorrowHistoryByUserId") 
    public List<BorrowHistory>  searchBorrowHistoryByUserId(@RequestParam int userid) {
        return borrowhistoryService.searchBorrowHistoryByUserId(userid);
    }
    
    @PostMapping("/borrowBook")

//    public ResponseEntity<String> borrowBook(@RequestParam int bookid, @RequestParam int userid) {
    public ResponseEntity<?> borrowBook(@RequestParam int bookid, @RequestParam int userid) {
        boolean isBorrowed = borrowhistoryService.borrowBook(bookid,userid);
        if (isBorrowed) {
//            return ResponseEntity.ok("Book borrowed successfully");
            return new ResponseEntity<>("Book borrowed successfully!", HttpStatus.OK);
        } else {
//            return ResponseEntity.status(404).body("Book not available");
            return new ResponseEntity<>("Book borrowed successfully!", HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("/returnBook")
////    public ResponseEntity<String> returnBook(@RequestParam int bookid, @RequestParam int userid) {
//    public ResponseEntity<?> returnBook(@RequestParam int bookid, @RequestParam int userid) {
//        boolean isReturned = borrowhistoryService.returnBook(bookid,userid);
//        if (isReturned) {
////            return ResponseEntity.ok("Book borrowed successfully");
//            return new ResponseEntity<>("Book returned successfully!", HttpStatus.OK);
//        } else {
////            return ResponseEntity.status(404).body("Book not available");
//            return new ResponseEntity<>("Book is not returned!", HttpStatus.NOT_FOUND );
//        }
//    }
    
    @PostMapping("/returnBook")
    public ResponseEntity<String> returnBook(@RequestParam int bookid, @RequestParam int userid) {
        try {
            boolean isReturned = borrowhistoryService.returnBook(bookid, userid);
            
            if (isReturned) {
                return ResponseEntity.ok("Book returned successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book was not found or not borrowed.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while returning the book.");
        }
    }
    
    @PostMapping("/reserveBook")
    public ResponseEntity<String> reserveBook(@RequestParam int bookid, @RequestParam int userid) {
        boolean isReserved = borrowhistoryService.reserveBook(bookid,userid);
        if (isReserved) {
            return ResponseEntity.ok("Book borrowed successfully");
        } else {
            return ResponseEntity.status(404).body("Book not available");
        }
    }
    
    @PostMapping("/borrowReservedBook")
//    public ResponseEntity<String> borrowReservedBook(@RequestParam int bookid, @RequestParam int userid) {
    public ResponseEntity<?> borrowReservedBook(@RequestParam int bookid, @RequestParam int userid) {
        boolean isBorrowed = borrowhistoryService.borrowReservedBook(bookid,userid);
        if (!isBorrowed) {
            return ResponseEntity.ok("Book borrowed successfully");
        } else {
            return ResponseEntity.status(404).body("Book not available");
        }
    }
    
    @PostMapping("/releaseReservedBook")
//    public ResponseEntity<String> releaseReservedBook(@RequestParam int bookid, @RequestParam int userid) {
    public ResponseEntity<?> releaseReservedBook(@RequestParam int bookid, @RequestParam int userid) {
        boolean isReleased = borrowhistoryService.releaseReservedBook(bookid,userid);
        if (isReleased) {
            return ResponseEntity.ok("Book released successfully");
        } else {
            return ResponseEntity.status(404).body("Book not released");
        }
    }
}