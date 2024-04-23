package com.upo.ebank.repository;

import com.upo.ebank.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository  extends JpaRepository<BankAccount, String> {
    List<BankAccount> findByClientId(Long clientId);
}
