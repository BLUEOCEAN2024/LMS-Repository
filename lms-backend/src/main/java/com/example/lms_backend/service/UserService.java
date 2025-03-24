package com.example.lms_backend.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.PasswordResetToken;
import com.example.lms_backend.model.User;
import com.example.lms_backend.repository.PasswordResetTokenRepository;
import com.example.lms_backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    
//    @Autowired
//    private JavaMailSender javaMailSender;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
    
    public void deleteUserByID(int id) {
    	userRepository.deleteById(id);
    }
    
    public List<User> findByName(String name) {
        return userRepository.findByName(name);
    }
    
    public User findByUserId(int id) {
        Optional<User> user = userRepository.findById(id);
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
    
    public User login(String name, String password) {
        Optional<User> existingUser = userRepository.findByName(name);
        if (existingUser.isPresent()) {
        	User user = existingUser.get();
            if (password.equals(user.getPwd())) {
        		return user;
        	}
        };
		return null;
    }
    
    public boolean doesUserExist(String name) {
        Optional<User> existingUser = userRepository.findByName(name);
        if (existingUser.isPresent()) {
        	return true;
        };
		return false;
    }
    

//    ------------------------------------------------------------------------------------
    
////  Generate a password reset token and send email
//    public void initiatePasswordReset(String email) {
//        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Generate a random token
//        String token = UUID.randomUUID().toString();
//        
//        // Create a reset token entity
//        PasswordResetToken resetToken = new PasswordResetToken();
//        resetToken.setUser(user);
//        resetToken.setToken(token);
//        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1)); // Token expires in 1 hour
//        passwordResetTokenRepository.save(resetToken);
//
//        // Send the reset email
//        sendPasswordResetEmail(user, token);
//    }

//    // Send password reset email
//    private void sendPasswordResetEmail(User user, String token) {
//        String resetLink = "http://localhost:3000/reset-password?token=" + token; // Adjust URL based on your frontend
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(user.getEmail());
//        message.setSubject("Password Reset Request");
//        message.setText("To reset your password, click the link below:\n" + resetLink);
//        
//        javaMailSender.send(message);
//    }

//    // Reset password using the token
//    public void resetPassword(String token, String newPassword) {
//        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
//            .orElseThrow(() -> new RuntimeException("Invalid token"));
//
//        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
//            throw new RuntimeException("Token expired");
//        }
//
//        User user = resetToken.getUser();
//        user.setPwd(newPassword); // Remember to hash the password
//        userRepository.save(user);
//    }
    
 // Reset password using the token
    public boolean resetPassword(String email, String newPassword) {      
        Optional<User> existingUser = userRepository.findByEmail(email);
         if (existingUser.isPresent()) {         
	         User user = existingUser.get();
	         user.setPwd(newPassword); 	         
	         userRepository.save(user);
	         return true;
         }
         return false;
    }
    
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
}
