package com.example.lms_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.service.UserService;

@RestController
@RequestMapping("/api/passwordreset")
@CrossOrigin(origins = "http://localhost:5173") // integration with React frontend 
public class PasswordResetController {

    @Autowired
    private UserService userService;

    // Endpoint to initiate password reset (send email)
//    @PostMapping("/reset-password")
//    public ResponseEntity<String> initiatePasswordReset(@RequestBody String email) {
//        userService.initiatePasswordReset(email);
//        return ResponseEntity.ok("Password reset link has been sent to your email.");
//    }

    // Endpoint to actually reset the password
    @PostMapping("/update-password")
//    public ResponseEntity<String> updatePassword(@RequestParam String token, @RequestBody String newPassword) {
  public ResponseEntity<?> updatePassword(@RequestParam String email, @RequestParam String newPassword) {
        boolean isReset = userService.resetPassword(email, newPassword);
        if (isReset) {
            return ResponseEntity.ok("Password has been updated successfully");
        } else {
            return ResponseEntity.status(404).body("Not able to update Password");
        }
    }
}
