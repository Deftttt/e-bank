package com.upo.ebank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "register_confirmation_token")
@NoArgsConstructor
@AllArgsConstructor
public class RegisterConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    private LocalDateTime createdAt;

    private LocalDateTime expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public RegisterConfirmationToken(User user) {
        this.user = user;
        this.token = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.expiryDate = LocalDateTime.now().plusDays(1);
    }

}
