package com.upo.ebank.repository;

import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
