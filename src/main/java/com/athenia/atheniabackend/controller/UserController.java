package com.athenia.atheniabackend.controller;

import com.athenia.atheniabackend.entity.User;
import com.athenia.atheniabackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(
        origins = {
                "http://localhost:5173",      // 🔹 Frontend local (Vite + React)
                "https://athenia-frontend.s3.amazonaws.com", // 🔹 Ejemplo AWS S3
                "https://yourdomain.com"      // 🔹 Producción
        },
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ✅ 1. Obtener todos los usuarios
    @GetMapping(produces = "application/json")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    // ✅ 2. Crear nuevo usuario
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        try {
            User saved = userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ✅ 3. Buscar usuario por email (para depuración o consultas)
    @GetMapping(value = "/email/{email}", produces = "application/json")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        return userOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // ✅ 4. Obtener perfil del usuario autenticado (usado por /profile en React)
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName(); // se obtiene desde el token JWT
            Optional<User> userOpt = userRepository.findByEmail(email);

            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("❌ Usuario no encontrado");
            }
            return ResponseEntity.ok(userOpt.get());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("❌ Error al obtener el perfil: " + e.getMessage());
        }
    }

    // ✅ 5. Actualizar perfil del usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("❌ Usuario no encontrado");
        }

        User user = userOpt.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        userRepository.save(user);

        return ResponseEntity.ok("✅ Perfil actualizado correctamente");
    }

    // ✅ 6. Endpoint de prueba (para Postman o salud del backend)
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("{\"status\":\"Backend AthenIA activo ✅\"}");
    }
}
