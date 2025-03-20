package com.librarymanagement.controller;

import com.librarymanagement.model.User;
import com.librarymanagement.repository.UserRepository;
import com.librarymanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    

//  -----------------------------------------------------------------------------
//    @PostMapping("/register")
//    public User register(@RequestParam String username, @RequestParam String email,
//                         @RequestParam String password, @RequestParam String role) {
//        return userService.registerUser(username, email, password, role);
//    }
//    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {   
        return ResponseEntity.ok(userService.registerUser(user));
    }
    
    @GetMapping("/profile/{username}")
    public User getUserProfile(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/update")
    public User updateProfile(@RequestBody User user) {
        userService.updateProfile(user);
        return user;
    }
    
//    -----------------------------------------------------------------------------
    @GetMapping
    public List<User> getAllMember() {
        return userRepository.findAll();
    }

    @PostMapping("/addMember/{id}")
    public User addMember(@RequestBody User member) {
        return userRepository.save(member);
    }
    
    @PutMapping("/{id}")
    public User updateMember(@PathVariable Long id, @RequestBody User memberDetails) {
    	User member = userRepository.findById(id).orElseThrow();
        member.setUsername(memberDetails.getUsername());
        member.setEmail(memberDetails.getEmail());
        member.setPassword(memberDetails.getPassword());
        member.setRole(memberDetails.getRole());
        member.setIsActive(memberDetails.getIsActive());
        return userRepository.save(member);
    }

    @DeleteMapping("/{id}")
    public void deleteMember(@PathVariable Long id) {
    	userRepository.deleteById(id);
    }

    @GetMapping("/{id}")
    public User getMemberById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
