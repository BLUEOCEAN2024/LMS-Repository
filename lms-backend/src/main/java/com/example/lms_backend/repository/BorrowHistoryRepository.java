package com.example.lms_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.BorrowHistory;

@Repository
public interface BorrowHistoryRepository extends JpaRepository<BorrowHistory, Integer> {

	List<BorrowHistory> findByBookid(int bookid);

	List<BorrowHistory> findByUserid(int userid);
	
//	public List<BorrowHistory> findAll() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public BorrowHistory save(BorrowHistory borrowhistory) {
//		// TODO Auto-generated method stub
//		return null;
//	}
	
}



