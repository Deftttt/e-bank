package com.upo.ebank.service;

import com.upo.ebank.model.User;
import com.upo.ebank.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
}
