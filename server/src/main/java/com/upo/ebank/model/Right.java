package com.upo.ebank.model;

import com.upo.ebank.model.enums.RightName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "_right")
@NoArgsConstructor
@AllArgsConstructor
public class Right {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RightName name;

}
