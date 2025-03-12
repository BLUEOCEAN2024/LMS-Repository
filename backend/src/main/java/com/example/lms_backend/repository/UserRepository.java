package com.example.lms_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lms_backend.model.User;

public class UserRepository extends JpaRepository<User, int> {

	public List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	public User save(User user) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
