package com.upo.ebank.repository;

import com.upo.ebank.model.Position;
import com.upo.ebank.model.RegisterConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterConfirmationTokenRepository extends JpaRepository<RegisterConfirmationToken, Long> {
    RegisterConfirmationToken findByToken(String token);
}
