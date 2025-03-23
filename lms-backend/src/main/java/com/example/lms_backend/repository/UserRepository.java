package com.example.lms_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

//	public List<User> findAll() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public User save(User user) {
//		// TODO Auto-generated method stubs
//		return null;
//	}
	
    Optional<User> findByEmail(String email);


    Optional<User> findByName(String name);

}
