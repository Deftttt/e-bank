package com.upo.ebank.service;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.repository.BankAccountRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final ModelMapper modelMapper;

    public List<BankAccountDto> getBankAccounts(AccountType accountType, Pageable pageable) {
        Page<BankAccount> accounts;
        if (accountType != null) {
            accounts = bankAccountRepository.findByAccountType(accountType, pageable);
        } else {
            accounts = bankAccountRepository.findAll(pageable);
        }
        return accounts.stream()
                .map(account -> modelMapper.map(account, BankAccountDto.class))
                .collect(Collectors.toList());
    }

    public List<BankAccountDto> getBankAccountsByClientId(Long clientId, AccountType accountType, Pageable pageable) {
        Page<BankAccount> accounts;
        if (accountType != null) {
            accounts = bankAccountRepository.findByClientIdAndAccountType(clientId, accountType, pageable);
        } else {
            accounts = bankAccountRepository.findByClientId(clientId, pageable);
        }
        return accounts.stream()
                .map(account -> modelMapper.map(account, BankAccountDto.class))
                .collect(Collectors.toList());
    }

    public long getTotalAccountsNumber(AccountType accountType) {
        if (accountType != null) {
            return bankAccountRepository.countByAccountType(accountType);
        } else {
            return bankAccountRepository.count();
        }
    }

    public long getTotalAccountsNumberByClientId(Long clientId, AccountType accountType) {
        if (accountType != null) {
            return bankAccountRepository.countByClientIdAndAccountType(clientId, accountType);
        } else {
            return bankAccountRepository.countByClientId(clientId);
        }
    }

    public BankAccount getBankAccount(String accountNumber){
        return bankAccountRepository.findById(accountNumber).orElseThrow();
    }

    public boolean checkAccountOwner(String accountNumber, Long customerId) {
        BankAccount bankAccount = getBankAccount(accountNumber);
        return bankAccount.getClient().getId().equals(customerId);
    }

    public long getTotalAccountsNumber() {
        return bankAccountRepository.count();
    }

    public long getTotalAccountsNumberByClientId(Long clientId) {
        return bankAccountRepository.countByClientId(clientId);
    }

}
