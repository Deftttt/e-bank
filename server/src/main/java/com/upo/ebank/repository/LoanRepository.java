package com.upo.ebank.repository;

import com.upo.ebank.model.Loan;
import com.upo.ebank.model.enums.LoanStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    Page<Loan> findByStatus(LoanStatus status, Pageable pageable);
    Page<Loan> findByEmployeeId(Long employeeId, Pageable pageable);
    Page<Loan> findByEmployeeIdAndStatus(Long employeeId, LoanStatus status, Pageable pageable);
    Page<Loan> findByClientId(Long clientId, Pageable pageable);
    Page<Loan> findByClientIdAndStatus(Long clientId, LoanStatus status, Pageable pageable);
    Page<Loan> findAll(Pageable pageable);

    long countByStatus(LoanStatus status);
}
