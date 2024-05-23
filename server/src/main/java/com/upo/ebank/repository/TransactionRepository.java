package com.upo.ebank.repository;

import com.upo.ebank.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t " +
            "WHERE t.senderAccount.accountNumber = :accountNumber OR t.recipientAccount.accountNumber = :accountNumber")
    Page<Transaction> findTransactionsByAccountNumber(@Param("accountNumber") String accountNumber, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.senderAccount.accountNumber = :accountNumber")
    Page<Transaction> findOutgoingTransactionsBySenderAccountNumber(@Param("accountNumber") String accountNumber, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.recipientAccount.accountNumber = :accountNumber")
    Page<Transaction> findIncomingTransactionsByAccountNumber(@Param("accountNumber") String accountNumber, Pageable pageable);

    @Query("SELECT t FROM Transaction t " +
            "WHERE t.senderAccount.client.id = :clientId OR t.recipientAccount.client.id = :clientId")
    Page<Transaction> findTransactionsByClientId(@Param("clientId") Long clientId, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.senderAccount.client.id = :clientId")
    Page<Transaction> findOutgoingTransactionsByClientId(@Param("clientId") Long clientId, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.recipientAccount.client.id = :clientId")
    Page<Transaction> findIncomingTransactionsByClientId(@Param("clientId") Long clientId, Pageable pageable);
}
