package com.upo.ebank.repository;

import com.upo.ebank.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {
}
