package com.upo.ebank.repository;

import com.upo.ebank.model.TimeDeposit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeDepositRepository extends JpaRepository<TimeDeposit, Long> {
    Page<TimeDeposit> findByBankAccountAccountNumber(String accountNumber, Pageable pageable);
    long countByBankAccountAccountNumber(String accountNumber);
    Page<TimeDeposit> findByBankAccountClientId(Long clientId, Pageable pageable);
    long countByBankAccountClientId(Long clientId);
}
