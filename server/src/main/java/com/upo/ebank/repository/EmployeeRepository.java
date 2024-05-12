package com.upo.ebank.repository;

import com.upo.ebank.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e LEFT JOIN Loan l ON e.id = l.employee.id " +
            "WHERE e.position.positionName = 'Loan Analyst' " +
            "GROUP BY e " +
            "ORDER BY COUNT(l) ASC, e.id ASC LIMIT 1")
    Employee findWithLeastAssignedLoans();

}
