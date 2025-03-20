package com.example.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping
    public BorrowHistory addBorrowHistory(@RequestBody BorrowHistory borrowhistory) {
        return borrowhistoryService.addBorrowHistory(borrowhistory);
    }
}