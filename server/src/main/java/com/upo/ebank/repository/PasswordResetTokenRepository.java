package com.upo.ebank.repository;

import com.upo.ebank.model.PasswordResetToken;
import com.upo.ebank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findTopByUserOrderByCreatedAtDesc(User user);
    @Transactional
    void deleteByUser(User user);
}