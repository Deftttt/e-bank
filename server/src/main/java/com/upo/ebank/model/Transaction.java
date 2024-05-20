package com.upo.ebank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "transaction")
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;

    private Date transactionDate;

    private String message;

    @ManyToOne
    @JoinColumn(name = "sender_account_id")
    private BankAccount senderAccount;

    @ManyToOne
    @JoinColumn(name = "recipient_account_id")
    private BankAccount recipientAccount;

    public Transaction(Long id, BigDecimal amount, Date transactionDate, BankAccount senderAccount, BankAccount recipientAccount) {
        this.id = id;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.senderAccount = senderAccount;
        this.recipientAccount = recipientAccount;
    }
}
