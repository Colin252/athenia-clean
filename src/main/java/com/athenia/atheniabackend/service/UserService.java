package com.athenia.atheniabackend.service;

import com.athenia.atheniabackend.entity.User;
import com.athenia.atheniabackend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Obtener todos los usuarios del sistema
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Guardar o actualizar un usuario
     */
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * Buscar usuario por email
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Eliminar usuario por ID
     */
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }
}
