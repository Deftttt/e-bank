package com.upo.ebank.controller;

import com.upo.ebank.model.User;
import com.upo.ebank.model.dto.UserUpdateDto;
import com.upo.ebank.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PreAuthorize("#id == principal.userId")
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {

        return userService.getUser(id);
    }

    @PreAuthorize("#id == principal.userId")
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @Valid @RequestBody UserUpdateDto userUpdateDto) {
        return userService.updateUser(id, userUpdateDto);
    }

}