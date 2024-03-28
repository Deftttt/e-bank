package com.upo.ebank.repository;

import com.upo.ebank.model.Address;
import com.upo.ebank.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
