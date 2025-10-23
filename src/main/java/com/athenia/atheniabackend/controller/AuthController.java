package com.athenia.atheniabackend.controller;

import com.athenia.atheniabackend.dto.LoginRequest;
import com.athenia.atheniabackend.dto.LoginResponse;
import com.athenia.atheniabackend.dto.RegisterRequest;
import com.athenia.atheniabackend.entity.User;
import com.athenia.atheniabackend.jwt.JwtUtils;
import com.athenia.atheniabackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://athenia-frontend.s3.amazonaws.com",
        "https://yourdomain.com"
})
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 🔐 Login real con generación de token JWT
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userService.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new LoginResponse("❌ Usuario no encontrado", null, null, null));
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body(new LoginResponse("❌ Contraseña incorrecta", null, null, null));
        }

        // Generar token JWT
        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse("✅ Login exitoso", token, user.getName(), user.getRole()));
    }

    /**
     * 🧾 Registro de nuevo usuario (con contraseña encriptada)
     */
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        Optional<User> existing = userService.findByEmail(request.getEmail());

        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("⚠️ Ya existe un usuario con ese correo.");
        }

        User newUser = new User();
        newUser.setName(request.getName());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole(request.getRole() != null ? request.getRole() : "USER");

        userService.save(newUser);
        return ResponseEntity.ok("✅ Usuario registrado exitosamente");
    }
}
