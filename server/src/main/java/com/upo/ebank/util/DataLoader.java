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

        //Address address1 = new Address(null, "Przemysl", "Opalinskiego", "23/24", "37-700", "Polska");
        //Address address2 = new Address(null,"Rzeszów", "Rejtana", "50", "37-800", "Polska");

        //User user = new User(null, "piotrstasicki@gmail.com", passwordEncoder.encode("password"),  "Piotr", "Stasicki", "728119146", address1);
        //User user2 = new User(null, "adam.michnik@gmail.com", passwordEncoder.encode("password"), "Adam", "Michnik", "888270840", address2);

        Client client = new Client();
        client.setEmail("client@example.com");
        client.setPassword(passwordEncoder.encode("password"));
        client.setFirstName("John");
        client.setLastName("Doe");
        client.setPhoneNumber("123456789");
        client.setPesel("CLIENT PESEL");

        Address address = new Address();
        address.setCity("City");
        address.setStreet("Street");
        address.setLocalNumber("1A");
        address.setPostCode("12345");
        address.setCountry("Country");
        client.setAddress(address);

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



        Address address2 = new Address();
        address2.setCity("City");
        address2.setStreet("Street");
        address2.setLocalNumber("2B");
        address2.setPostCode("54321");
        address2.setCountry("Country");
        employee.setAddress(address2);

        // Zapisanie klienta w bazie danych
        clientService.addClient(client);
        employeeService.addEmployee(employee);

        //userService.addUser(user);
        //userService.addUser(user2);

    }


}
