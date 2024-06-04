package com.upo.ebank.service;

import com.upo.ebank.exception.DepositAlreadyCanceledException;
import com.upo.ebank.exception.InsufficientBalanceForDepositException;
import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.TimeDeposit;
import com.upo.ebank.model.dto.deposits.TimeDepositDetailsDto;
import com.upo.ebank.model.dto.deposits.TimeDepositDto;
import com.upo.ebank.model.dto.deposits.TimeDepositRequest;
import com.upo.ebank.model.enums.DepositStatus;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.TimeDepositRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimeDepositService {

    private final TimeDepositRepository timeDepositRepository;
    private final ModelMapper modelMapper;
    private final BankAccountRepository bankAccountRepository;

    public List<TimeDepositDto> getAllTimeDeposits(Pageable pageable) {
        return timeDepositRepository.findAll(pageable).stream()
                .map(timeDeposit -> modelMapper.map(timeDeposit, TimeDepositDto.class))
                .collect(Collectors.toList());
    }

    public long getTotalDepositsNumber() {
        return timeDepositRepository.count();
    }

    public List<TimeDepositDto> getTimeDepositsByAccountNumber(String accountNumber, Pageable pageable) {
        return timeDepositRepository.findByBankAccountAccountNumber(accountNumber, pageable).stream()
                .map(timeDeposit -> modelMapper.map(timeDeposit, TimeDepositDto.class))
                .collect(Collectors.toList());
    }

    public long getTotalDepositsNumberByAccountNumber(String accountNumber) {
        return timeDepositRepository.countByBankAccountAccountNumber(accountNumber);
    }

    public TimeDepositDetailsDto getTimeDeposit(Long id) {
        TimeDeposit deposit = timeDepositRepository.findById(id).orElseThrow();
        return convertToDetailsDto(deposit);
    }

    private TimeDepositDetailsDto convertToDetailsDto(TimeDeposit deposit) {
        TimeDepositDetailsDto timeDepositDetailsDto = modelMapper.map(deposit, TimeDepositDetailsDto.class);
        timeDepositDetailsDto.setClientFirstName(deposit.getBankAccount().getClient().getFirstName());
        timeDepositDetailsDto.setClientLastName(deposit.getBankAccount().getClient().getLastName());
        timeDepositDetailsDto.setMonths(deposit.getDepositType().getMonths());
        timeDepositDetailsDto.setInterestRate(deposit.getDepositType().getInterestRate());

        BigDecimal calculatedAmount = calculateFinalAmount(deposit.getDepositAmount(), deposit.getDepositType().getInterestRate(), deposit.getDepositType().getMonths());
        timeDepositDetailsDto.setFinalAmount(calculatedAmount);

        return timeDepositDetailsDto;
    }

    private BigDecimal calculateFinalAmount(BigDecimal principal, double interestRate, int months) {
        BigDecimal monthlyRate = BigDecimal.valueOf(interestRate).divide(BigDecimal.valueOf(12), MathContext.DECIMAL128);
        BigDecimal onePlusRate = BigDecimal.ONE.add(monthlyRate);
        BigDecimal finalAmount = principal.multiply(onePlusRate.pow(months, MathContext.DECIMAL128));
        return finalAmount.setScale(2, RoundingMode.HALF_UP);
    }


    public TimeDeposit requestTimeDeposit(String accountNumber, TimeDepositRequest timeDepositRequest) {
        BankAccount bankAccount = bankAccountRepository.findByAccountNumber(accountNumber);
        if (bankAccount.getBalance().compareTo(timeDepositRequest.getDepositAmount()) < 0) {
            throw new InsufficientBalanceForDepositException("Insufficient funds in account.");
        }

        bankAccount.setBalance(bankAccount.getBalance().subtract(timeDepositRequest.getDepositAmount()));
        bankAccountRepository.save(bankAccount);

        TimeDeposit timeDeposit = TimeDeposit.builder()
                .bankAccount(bankAccount)
                .depositAmount(timeDepositRequest.getDepositAmount())
                .startDate(timeDepositRequest.getStartDate())
                .status(DepositStatus.ACTIVE)
                .build();
        timeDeposit.setDepositType(timeDepositRequest.getDepositType());
        return timeDepositRepository.save(timeDeposit);
    }

    public void cancelTimeDeposit(Long id) {
        TimeDeposit deposit = timeDepositRepository.findById(id).orElseThrow();
        if (deposit.getStatus() != DepositStatus.ACTIVE) {
            throw new DepositAlreadyCanceledException("Only active deposits can be canceled.");
        }
        BankAccount bankAccount = deposit.getBankAccount();

        Date currentDate = new Date();
        BigDecimal amountToReturn;
        if (currentDate.after(deposit.getEndDate())) {
            amountToReturn = calculateFinalAmount(deposit.getDepositAmount(), deposit.getDepositType().getInterestRate(), deposit.getDepositType().getMonths());
        } else {
            amountToReturn = deposit.getDepositAmount();
        }

        bankAccount.setBalance(bankAccount.getBalance().add(amountToReturn));
        deposit.setStatus(DepositStatus.CLOSED);

        bankAccountRepository.save(bankAccount);
        timeDepositRepository.save(deposit);
    }


    public boolean checkDepositOwner(Long depositId, Long userId) {
        TimeDeposit deposit = timeDepositRepository.findById(depositId).orElseThrow();
        return deposit.getBankAccount().getClient().getId().equals(userId);
    }

    public boolean checkAccountOwner(String accountNumber, Long userId) {
        BankAccount bankAccount = bankAccountRepository.findByAccountNumber(accountNumber);
        return bankAccount.getClient().getId().equals(userId);
    }
}
