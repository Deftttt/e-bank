package com.upo.ebank.service;

import com.upo.ebank.model.Employee;
import com.upo.ebank.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public Employee getEmployee(Long id){
        return employeeRepository.findById(id).orElseThrow();
    }

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }
}
