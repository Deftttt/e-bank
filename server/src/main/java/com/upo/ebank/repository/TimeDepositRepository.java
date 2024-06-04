package com.upo.ebank.repository;

import com.upo.ebank.model.TimeDeposit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeDepositRepository extends JpaRepository<TimeDeposit, Long> {

    long countByBankAccountAccountNumber(String accountNumber);

    Page<TimeDeposit> findByBankAccountAccountNumber(String accountNumber, Pageable pageable);
}
