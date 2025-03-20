package com.example.lms_backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.BorrowHistory;
import com.example.lms_backend.repository.BorrowHistoryRepository;

@Service
public class BorrowHistoryService {
    @Autowired
    private BorrowHistoryRepository borrowhistoryRepository;

	public List<BorrowHistory> getAllBorrowHistory() {
        return borrowhistoryRepository.findAll();
	}

    public BorrowHistory addBorrowHistory(BorrowHistory borrowhistory) {
        return borrowhistoryRepository.save(borrowhistory);
    }


}
