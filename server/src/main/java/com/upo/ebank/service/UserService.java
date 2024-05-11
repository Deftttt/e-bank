package com.upo.ebank.service;

import com.upo.ebank.model.Address;
import com.upo.ebank.model.User;
import com.upo.ebank.model.dto.AddressUpdateDto;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.model.dto.UserUpdateDto;
import com.upo.ebank.repository.AddressRepository;
import com.upo.ebank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }
    public User getUser(String email){
        return userRepository.findByEmail(email);
    }
    public User getUser(Long id){
        return userRepository.findById(id).orElseThrow();
    }
    public User addUser(User user){
        return userRepository.save(user);
    }
    public boolean isEmailTaken(String email){
        return userRepository.findByEmail(email) != null;
    }

    public User updateUser(Long id, UserUpdateDto userUpdateDto) {
        User user = getUser(id);

        user.setFirstName(userUpdateDto.getFirstName());
        user.setLastName(userUpdateDto.getLastName());
        user.setPhoneNumber(userUpdateDto.getPhoneNumber());

        user.getAddresses().clear();
        for (AddressUpdateDto addressUpdateDto : userUpdateDto.getAddresses()) {
            Address address = new Address();
            address.setStreet(addressUpdateDto.getStreet());
            address.setCity(addressUpdateDto.getCity());
            address.setCountry(addressUpdateDto.getCountry());
            address.setPostCode(addressUpdateDto.getPostCode());
            address.setLocalNumber(addressUpdateDto.getLocalNumber());
            user.getAddresses().add(address);
        }

        return userRepository.save(user);
    }
}
