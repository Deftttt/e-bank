package com.upo.ebank.service;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.dto.BankAccountDto;
import com.upo.ebank.repository.BankAccountRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final ModelMapper modelMapper;

    public List<BankAccountDto> getBankAccounts(){
        List<BankAccount> bankAccounts = bankAccountRepository.findAll();
        return bankAccounts.stream()
                .map(bankAccount -> modelMapper.map(bankAccount, BankAccountDto.class))
                .collect(Collectors.toList());
    }

    public BankAccountDto getBankAccountByAccountNumber(String accountNumber){
        BankAccount bankAccount = bankAccountRepository.findById(accountNumber).orElseThrow();
        return modelMapper.map(bankAccount, BankAccountDto.class);
    }


    public List<BankAccountDto> getBankAccountsByClientId(Long clientId){
        List<BankAccount> bankAccounts = bankAccountRepository.findByClientId(clientId);
        return bankAccounts.stream()
                .map(bankAccount -> modelMapper.map(bankAccount, BankAccountDto.class))
                .collect(Collectors.toList());
    }

}
