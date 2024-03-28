package com.upo.ebank.util;

import com.upo.ebank.model.Address;
import com.upo.ebank.model.User;
import com.upo.ebank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;



    @EventListener(ApplicationReadyEvent.class)
    public void get(){

        Address address1 = new Address(null, "Przemysl", "Opalinskiego", "23/24", "37-700", "Polska");
        Address address2 = new Address(null,"Rzeszów", "Rejtana", "50", "37-800", "Polska");

        User user = new User(null, "piotrstasicki@gmail.com", passwordEncoder.encode("password"),  "Piotr", "Stasicki", "728119146", address1);
        User user2 = new User(null, "adam.michnik@gmail.com", passwordEncoder.encode("password"), "Adam", "Michnik", "888270840", address2);

        userService.addUser(user);
        userService.addUser(user2);

    }


}
