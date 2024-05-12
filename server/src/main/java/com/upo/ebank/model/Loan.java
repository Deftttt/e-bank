package com.upo.ebank.model;

import com.upo.ebank.model.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "loan")
@Builder
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoanStatus status;

    @Column(name = "application_date")
    private Date applicationDate;

    @Column(name = "decision_date")
    private Date decisionDate;

    @Column(name = "loan_purpose")
    private String loanPurpose;

    @Column(name = "loan_term")
    private Integer loanTermMonths;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "interest_rate")
    private Double interestRate;

    @Column(name = "monthly_repayment_amount")
    private BigDecimal monthlyRepaymentAmount;

    @Column(name = "total_repayment_amount")
    private BigDecimal totalRepaymentAmount;

}
