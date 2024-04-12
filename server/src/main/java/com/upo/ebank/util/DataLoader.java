package com.upo.ebank.util;

import com.upo.ebank.model.*;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.model.enums.Department;
import com.upo.ebank.model.enums.RightName;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.PositionRepository;
import com.upo.ebank.repository.TransactionRepository;
import com.upo.ebank.service.ClientService;
import com.upo.ebank.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final PasswordEncoder passwordEncoder;
    private final ClientService clientService;
    private final EmployeeService employeeService;
    private final PositionRepository positionRepository;
    private final BankAccountRepository bankAccountRepository;
    private final TransactionRepository transactionRepository;


    @EventListener(ApplicationReadyEvent.class)
    public void get(){

        Address address1 = new Address(null, "Przemysl", "Opalinskiego", "23/24", "37-700", "Polska");
        Address address2 = new Address(null,"Rzeszów", "Rejtana", "50", "37-800", "Polska");
        Address address3 = new Address(null, "Zamosc", "Polna", "48", "38-997", "Polska");
        Address address4 = new Address(null, "Kraków", "Norymberska", "10a/37", "36-721", "Polska");

        Client client = new Client(null, "client@example.com", passwordEncoder.encode("password"),
                "John", "Doe", "123456789", List.of(address1, address2), "CLIENT PESEL");

        Client client2 = new Client(null, "client2@example.com", passwordEncoder.encode("password"),
                "Mariusz", "Czerkawski", "997888096", List.of(address3), "CLIENT2 PESEL");



        Position position = new Position(null, "Emp_Position_1", 5600.0,
                Set.of(new Right(null, RightName.VIEW_CLIENTS), new Right(null, RightName.VIEW_EMPLOYEES)));
        positionRepository.save(position);


        Employee employee = new Employee(null, "piotrstasicki@gmail.com", passwordEncoder.encode("password"),
                "Piotr", "Stasicki", "728119146", List.of(address4), Department.DEPARTMENT_1, position);

        clientService.addClient(client);
        clientService.addClient(client2);
        employeeService.addEmployee(employee);


        BankAccount account1 = new BankAccount("1234567890", BigDecimal.valueOf(1000),
                new Date(), AccountType.PERSONAL_ACCOUNT, client);
        BankAccount account2 = new BankAccount("0987654321", BigDecimal.valueOf(2000),
                new Date(), AccountType.INVESTMENT_ACCOUNT, client);

        BankAccount account3 = new BankAccount("5432109876", BigDecimal.valueOf(1500),
                new Date(), AccountType.PERSONAL_ACCOUNT, client2);

        bankAccountRepository.save(account1);
        bankAccountRepository.save(account2);
        bankAccountRepository.save(account3);


        Transaction transaction1 = new Transaction(null, BigDecimal.valueOf(500),
                new Date(), account1, account2);
        Transaction transaction2 = new Transaction(null, BigDecimal.valueOf(300),
                new Date(), account1, account3);
        Transaction transaction3 = new Transaction(null, BigDecimal.valueOf(200),
                new Date(), account2, account3);

        transactionRepository.save(transaction1);
        transactionRepository.save(transaction2);
        transactionRepository.save(transaction3);

    }


}
