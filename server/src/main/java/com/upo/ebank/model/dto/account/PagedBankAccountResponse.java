package com.upo.ebank.model.dto.account;

import lombok.Data;

import java.util.List;

@Data
public class PagedBankAccountResponse {
    private List<BankAccountDto> accounts;
    private long totalElements;

    public PagedBankAccountResponse(List<BankAccountDto> accounts, long totalElements) {
        this.accounts = accounts;
        this.totalElements = totalElements;
    }
}
