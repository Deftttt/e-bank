package com.upo.ebank.repository;

import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
}