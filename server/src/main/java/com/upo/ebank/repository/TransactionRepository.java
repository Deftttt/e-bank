package com.upo.ebank.repository;

import com.upo.ebank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {
    @Query("SELECT t FROM Transaction t " +
            "WHERE t.senderAccount.accountNumber = :accountNumber OR t.recipientAccount.accountNumber = :accountNumber")
    List<Transaction> findTransactionsByAccountNumber(@Param("accountNumber") String accountNumber);

    @Query("SELECT t FROM Transaction t WHERE t.senderAccount.accountNumber = :accountNumber")
    List<Transaction> findOutgoingTransactionsBySenderAccountNumber(@Param("accountNumber") String accountNumber);

    @Query("SELECT t FROM Transaction t WHERE t.recipientAccount.accountNumber = :accountNumber")
    List<Transaction> findIncomingTransactionsByAccountNumber(@Param("accountNumber") String accountNumber);


}
