package com.ampta.user_service.repository;

import com.ampta.user_service.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    Boolean existsByKeycloakId(String userId);
}
