package com.upo.ebank.model;

import com.upo.ebank.model.enums.DepositStatus;
import com.upo.ebank.model.enums.DepositType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

@Data
@Entity
@Table(name = "time_deposit")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal depositAmount;

    private Date startDate;

    private Date endDate;

    @Enumerated(EnumType.STRING)
    private DepositStatus status;

    @ManyToOne
    @JoinColumn(name = "bank_account_number")
    private BankAccount bankAccount;

    @Enumerated(EnumType.STRING)
    private DepositType depositType;

    public void setDepositType(DepositType depositType) {
        this.depositType = depositType;
        this.endDate = calculateEndDate(startDate, depositType.getMonths());
    }

    private Date calculateEndDate(Date startDate, int months) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDate);
        cal.add(Calendar.MONTH, months);
        return cal.getTime();
    }
}
