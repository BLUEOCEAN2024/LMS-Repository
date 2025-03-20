package com.example.lms_backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.User;
import com.example.lms_backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUserByID(int id) {
    	userRepository.deleteById(id);
    }
    
    public User findByName(String name) {
        Optional<User> user = userRepository.findByName(name);
        return user.orElse(null);  // Return the book if found, otherwise return null
    }
    
        
    public User registerUser(User user) {        
        Date currentDate = new Date();   
        user.setCreated_dt(currentDate);        
        return userRepository.save(user);
    }
    
    public User registerUser(String name, String email, String password, String role) {
       Optional<User> existingUser = userRepository.findByName(name);
        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already exists");
        }    
        
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPwd(password); 
        user.setRole(role);
        Date currentDate = new Date();   
        user.setCreated_dt(currentDate);
        
        return userRepository.save(user);
    }
    
    
    public boolean login(String name, String password) {
        Optional<User> existingUser = userRepository.findByName(name);
        if (existingUser.isPresent()) {
        	if (existingUser.get().getPwd()==password) {
        		return true;
        	}
        };
		return false;
    }
    
    public boolean doesUserExist(String name) {
        Optional<User> existingUser = userRepository.findByName(name);
        if (existingUser.isPresent()) {
        	return true;
        };
		return false;
    }
    
}
