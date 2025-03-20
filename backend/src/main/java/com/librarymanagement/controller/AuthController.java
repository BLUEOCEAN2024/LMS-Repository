package com.librarymanagement.controller;

import com.librarymanagement.model.User;
import com.librarymanagement.service.PasswordResetService;
import com.librarymanagement.service.UserService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private PasswordResetService passwordResetService;
    @Autowired
    private UserService userService;

//    @PostMapping("/login")
//    public String login(@RequestParam String username, @RequestParam String password) {
//        // This would check username and password (no security used here)
//        return "Login successful for " + username;
//    }
    
    @PostMapping("/login")
    public Optional<User> login(@RequestParam String username, @RequestParam String password) {
        // Add login logic here
        return userService.findByUsername(username);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestParam String email) {
        String token = passwordResetService.createPasswordResetToken(email);
        return "Password reset token: " + token;
    }

    @PostMapping("/update-password")
    public String updatePassword(@RequestParam String token, @RequestParam String newPassword) {
        boolean success = passwordResetService.resetPassword(token, newPassword);
        return success ? "Password updated successfully" : "Failed to update password";
    }
}
