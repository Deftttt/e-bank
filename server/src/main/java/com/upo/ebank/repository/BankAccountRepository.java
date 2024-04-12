package com.upo.ebank.repository;

import com.upo.ebank.model.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository  extends JpaRepository<BankAccount, String> {
}
