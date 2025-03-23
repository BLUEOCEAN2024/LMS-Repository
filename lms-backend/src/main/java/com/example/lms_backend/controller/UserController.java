package com.example.lms_backend.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.User;
import com.example.lms_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // integration with React frontend 
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/addUser") 
    public User addUser(@RequestBody User user) {
    	// Create a Date object to get the current date
        Date currentDate = new Date();       
        user.setCreated_dt(currentDate);
    	
        return userService.addUser(user); 
    }
    
    @GetMapping("/getUserByName/{name}")
    public List<User> getUserByName(@PathVariable("name") String name) {
        return userService.findByName(name);  // Call the service method
    }
    
    @GetMapping("/getUserById/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return userService.findByUserId(id);  // Call the service method
    }
    
    @DeleteMapping("/deleteUserById/{id}") 
    public void deleteUserById(@PathVariable("id") int id) {    	
    	userService.deleteUserByID(id);
    }
    
//    @PostMapping("/registerUser")
//    public User register(@RequestParam String name, @RequestParam String email,
//                       @RequestParam String password, @RequestParam String role) {
//      return userService.registerUser(name, email, password, role);
//    }

    @PostMapping("/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            if (userService.doesUserExist(user.getName())) {
                return new ResponseEntity<>("User with this email already exists!", HttpStatus.BAD_REQUEST);
            }
            userService.registerUser(user);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
        } catch (Exception e) {
            // Handle any errors during registration
            return new ResponseEntity<>("Error registering user", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/updateUser/{id}") 
    public User updateUser(@RequestBody User user) {
    	// Create a Date object to get the current date
        Date currentDate = new Date();       
        user.setCreated_dt(currentDate);
    	
        return userService.updateUser(user); 
    }
    
}