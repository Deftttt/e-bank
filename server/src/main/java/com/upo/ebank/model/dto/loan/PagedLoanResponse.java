package com.upo.ebank.model.dto.loan;

import com.upo.ebank.model.dto.loan.LoanDto;
import lombok.Data;

import java.util.List;

@Data
public class PagedLoanResponse {
    private List<LoanDto> loans;
    private long totalElements;

    public PagedLoanResponse(List<LoanDto> loans, long size) {
        this.loans = loans;
        this.totalElements = size;
    }
}
