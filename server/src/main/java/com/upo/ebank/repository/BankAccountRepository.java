package com.upo.ebank.repository;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.enums.AccountType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository  extends JpaRepository<BankAccount, String> {
    Page<BankAccount> findByClientId(Long clientId, Pageable pageable);
    Page<BankAccount> findByClientIdAndAccountType(Long clientId, AccountType accountType, Pageable pageable);
    Page<BankAccount> findByAccountType(AccountType accountType, Pageable pageable);
    long countByClientId(Long clientId);
    long countByClientIdAndAccountType(Long clientId, AccountType accountType);
    long countByAccountType(AccountType accountType);

    BankAccount findByAccountNumber(String accountNumber);

}
