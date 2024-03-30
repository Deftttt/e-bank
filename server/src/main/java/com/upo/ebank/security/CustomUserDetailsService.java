package com.upo.ebank.security;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Role;
import com.upo.ebank.model.RoleName;
import com.upo.ebank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        var user = userService.getUser(username);
        Set<GrantedAuthority> authorities = new HashSet<>();

        if (user instanceof Employee) {
            for (Role role : ((Employee) user).getRoles()) {
                authorities.add(new SimpleGrantedAuthority(role.getName().toString()));
            }
        } else if (user instanceof Client) {
            authorities.add(new SimpleGrantedAuthority(RoleName.ROLE_USER.toString()));
        }
        return UserPrincipal.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .authorities(authorities)
                .password(user.getPassword())
                .build();
    }


}
