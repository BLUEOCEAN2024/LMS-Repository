package com.example.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.User;
import com.example.lms_backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllBooks() {
        return userRepository.findAll();
    }

    public User addBook(User user) {
        return userRepository.save(user);
    }
}
