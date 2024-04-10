package com.upo.ebank.util;

import com.upo.ebank.model.*;
import com.upo.ebank.repository.PositionRepository;
import com.upo.ebank.service.ClientService;
import com.upo.ebank.service.EmployeeService;
import com.upo.ebank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final ClientService clientService;
    private final EmployeeService employeeService;
    private final PositionRepository positionRepository;


    @EventListener(ApplicationReadyEvent.class)
    public void get(){

        Client client = new Client();
        client.setEmail("client@example.com");
        client.setPassword(passwordEncoder.encode("password"));
        client.setFirstName("John");
        client.setLastName("Doe");
        client.setPhoneNumber("123456789");
        client.setPesel("CLIENT PESEL");

        Address address1 = new Address(null, "Przemysl", "Opalinskiego", "23/24", "37-700", "Polska");
        Address address2 = new Address(null,"Rzeszów", "Rejtana", "50", "37-800", "Polska");
        client.setAddresses(List.of(address1, address2));


        Position position = new Position(
                null,
                "Emp_Position_1",
                5600.0,
                Set.of(new Right(null, RightName.VIEW_CLIENTS), new Right(null, RightName.VIEW_EMPLOYEES)));
        positionRepository.save(position);

        Employee employee = new Employee();
        employee.setEmail("piotrstasicki@gmail.com");
        employee.setPassword(passwordEncoder.encode("password"));
        employee.setFirstName("Piotr");
        employee.setLastName("Stasicki");
        employee.setPhoneNumber("728119146");
        employee.setDepartment(Department.DEPARTMENT_1);
        employee.setPosition(position);

        Address address3 = new Address(null, "Kraków", "Norymberska", "10a/37", "36-721", "Polska");
        employee.setAddresses(List.of(address3));

        clientService.addClient(client);
        employeeService.addEmployee(employee);

    }


}
