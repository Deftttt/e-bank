package com.upo.ebank.service;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.account.BankAccountDetailsDto;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.dto.account.ClientCreateBankAccountDto;
import com.upo.ebank.model.dto.account.EmployeeCreateBankAccountDto;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankAccountService {

    private final BankAccountRepository bankAccountRepository;
    private final ClientRepository clientRepository;
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

    public BankAccountDetailsDto getBankAccount(String accountNumber){
        BankAccount account = bankAccountRepository.findById(accountNumber).orElseThrow();
        return convertToDto(account);
    }
    private BankAccountDetailsDto convertToDto(BankAccount account) {
        BankAccountDetailsDto bankAccountDetailsDto = modelMapper.map(account, BankAccountDetailsDto.class);
        bankAccountDetailsDto.setClientFirstName(account.getClient().getFirstName());
        bankAccountDetailsDto.setClientLastName(account.getClient().getLastName());

        return bankAccountDetailsDto;
    }

    public boolean checkAccountOwner(String accountNumber, Long customerId) {
        BankAccount bankAccount = bankAccountRepository.findById(accountNumber).orElseThrow();
        return bankAccount.getClient().getId().equals(customerId);
    }

    public long getTotalAccountsNumber() {
        return bankAccountRepository.count();
    }

    public long getTotalAccountsNumberByClientId(Long clientId) {
        return bankAccountRepository.countByClientId(clientId);
    }

    public BankAccount createBankAccount(Long clientId, EmployeeCreateBankAccountDto createBankAccountDto) {
        Client client = clientRepository.findById(clientId).orElseThrow();

        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNumber(generateAccountNumber());
        bankAccount.setBalance(createBankAccountDto.getInitialDeposit());
        bankAccount.setOpeningDate(new Date());
        bankAccount.setAccountType(createBankAccountDto.getAccountType());
        bankAccount.setClient(client);

        return bankAccountRepository.save(bankAccount);
    }

    public BankAccount createBankAccount(Long clientId, ClientCreateBankAccountDto createBankAccountDto) {
        Client client = clientRepository.findById(clientId).orElseThrow();

        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNumber(generateAccountNumber());
        bankAccount.setBalance(BigDecimal.ZERO);
        bankAccount.setOpeningDate(new Date());
        bankAccount.setAccountType(createBankAccountDto.getAccountType());
        bankAccount.setClient(client);

        return bankAccountRepository.save(bankAccount);
    }

    private String generateAccountNumber() {
        Random random = new Random();
        String bankIdentifier = "12345678"; // Numer rozliczeniowy banku
        String clientIdentifier = String.format("%016d", random.nextLong() & Long.MAX_VALUE).substring(0, 16); // 16-cyfrowy numer klienta

        String partialAccountNumber = bankIdentifier + clientIdentifier;
        String checksum = calculateChecksum(partialAccountNumber);

        return checksum + partialAccountNumber;
    }

    private String calculateChecksum(String partialAccountNumber) {
        String accountNumberWithCountryCode = partialAccountNumber + "2521"; // "25" = PL, "21" to cyfry kontrolne
        BigInteger accountNumberBigInt = new BigInteger(accountNumberWithCountryCode);
        BigInteger checksum = BigInteger.valueOf(98).subtract(accountNumberBigInt.mod(BigInteger.valueOf(97)));
        return String.format("%02d", checksum.intValue());
    }


    public void blockAccount(String accountNumber) {
        BankAccount account = bankAccountRepository.findById(accountNumber).orElseThrow();
        account.setBlocked(true);
        bankAccountRepository.save(account);
    }

    public void unblockAccount(String accountNumber) {
        BankAccount account = bankAccountRepository.findById(accountNumber).orElseThrow();
        account.setBlocked(false);
        bankAccountRepository.save(account);
    }

}
