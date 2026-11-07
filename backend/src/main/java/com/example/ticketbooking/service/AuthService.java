package com.example.ticketbooking.service;

import com.example.ticketbooking.dto.AuthRequest;
import com.example.ticketbooking.dto.AuthResponse;
import com.example.ticketbooking.model.Role;
import com.example.ticketbooking.model.User;
import com.example.ticketbooking.repository.UserRepository;
import com.example.ticketbooking.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse register(AuthRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already taken");
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(Role.CUSTOMER);
        user.setAuthorities(Collections.singleton("ROLE_CUSTOMER"));
        userRepository.save(user);
        return new AuthResponse("User registered", null);
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse("Login successful", token);
    }
}
