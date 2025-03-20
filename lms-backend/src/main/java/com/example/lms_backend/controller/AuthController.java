package com.example.lms_backend.controller;

//import com.librarymanagement.service.PasswordResetService;
//import com.librarymanagement.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.lms_backend.model.User;
//import com.example.lms_backend.model.User;
import com.example.lms_backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // integration with React frontend 
@RequestMapping("/api/auth")
public class AuthController {

//    @Autowired
//    private PasswordResetService passwordResetService;
    @Autowired
    private UserService userService;

//    @GetMapping("/login")
//    public ResponseEntity<?> login (@RequestParam User user) {
//        try {
//            if (userService.doesUserExist(user.getName())) {
//                return new ResponseEntity<>("User does not exists!", HttpStatus.BAD_REQUEST);
//            }
//            if (userService.login(user.getName(), user.getPwd())) {
//            	return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
//            }
//            else {
//                return new ResponseEntity<>("User does not exists!", HttpStatus.BAD_REQUEST);        	
//            }
//        } catch (Exception e) {
//            // Handle any errors during registration
//            return new ResponseEntity<>("Error registering user", HttpStatus.BAD_REQUEST);
//        }
//    }

//    @GetMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String name, @RequestParam String password) {
//      boolean existingUser = userService.login(name,password);
//      if (existingUser) {
//    	  return new ResponseEntity<>("User login successfully!", HttpStatus.OK);
//      }  
//      else {      
//    	  return new ResponseEntity<>("Error user logging in", HttpStatus.BAD_REQUEST);
//      }
//  }
    
    @GetMapping("/login")
    public User login(@RequestParam String name, @RequestParam String password) {
     return userService.login(name,password);

  }

//  @PostMapping("/login")
//  public String login(@RequestParam String name, @RequestParam String password) {
//      // This would check username and password (no security used here)
//      Optional<User> existingUser = userService.login(name,password);
//      if (existingUser.isPresent()) {
//          return "Login successful for " + name;
//      }    
//      
//      return "User does not exist: " + name;
//  }
  
    
//    @GetMapping("/login")
//    public Optional<User> login(@RequestParam String username, @RequestParam String password) {
//        // Add login logic here
//        return Optional.of(userService.findByName(username));
//    }

//    @PostMapping("/reset-password")
//    public String resetPassword(@RequestParam String email) {
//        String token = passwordResetService.createPasswordResetToken(email);
//        return "Password reset token: " + token;
//    }
//
//    @PostMapping("/update-password")
//    public String updatePassword(@RequestParam String token, @RequestParam String newPassword) {
//        boolean success = passwordResetService.resetPassword(token, newPassword);
//        return success ? "Password updated successfully" : "Failed to update password";
//    }
}
