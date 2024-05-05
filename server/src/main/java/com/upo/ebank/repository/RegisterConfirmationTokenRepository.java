package com.upo.ebank.repository;

import com.upo.ebank.model.Position;
import com.upo.ebank.model.RegisterConfirmationToken;
import com.upo.ebank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RegisterConfirmationTokenRepository extends JpaRepository<RegisterConfirmationToken, Long> {
    RegisterConfirmationToken findByToken(String token);

    RegisterConfirmationToken findTopByUserOrderByCreatedAtDesc(User user);
    @Transactional
    void deleteByUser(User user);

}
