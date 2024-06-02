package com.upo.ebank.service;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.TimeDeposit;
import com.upo.ebank.model.dto.TimeDepositDetailsDto;
import com.upo.ebank.model.dto.TimeDepositDto;
import com.upo.ebank.model.dto.TimeDepositRequest;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.enums.DepositStatus;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.TimeDepositRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
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

//    public TimeDepositDetailsDto getTimeDeposit(Long id) {
//        Optional<TimeDeposit> deposit = timeDepositRepository.findById(id);
//        return deposit.map(this::convertToDetailsDto).orElseThrow(() -> new ResourceNotFoundException("TimeDeposit not found with id " + id));
//    }
//
    public List<TimeDepositDto> getTimeDepositsByAccountNumber(String accountNumber, Pageable pageable) {
        return timeDepositRepository.findByBankAccountAccountNumber(accountNumber, pageable).stream()
                .map(timeDeposit -> modelMapper.map(timeDeposit, TimeDepositDto.class))
                .collect(Collectors.toList());
    }
//
//    public long getTotalDepositsNumberByClientId(Long clientId) {
//        return timeDepositRepository.countByBankAccountClientId(clientId);
//    }
//
//    public boolean checkDepositOwner(Long depositId, Long userId) {
//        // Implement logic to check if the user is the owner of the deposit
//        return true; // Dummy implementation for demonstration
//    }
//
    private TimeDepositDto convertToDto(TimeDeposit deposit) {
        // Implement conversion logic
        return new TimeDepositDto();
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
        return timeDepositDetailsDto;
    }

    public TimeDeposit requestTimeDeposit(String accountNumber, TimeDepositRequest timeDepositRequest) {
       BankAccount bankAccount = bankAccountRepository.findByAccountNumber(accountNumber);
       TimeDeposit timeDeposit =  TimeDeposit.builder()
               .bankAccount(bankAccount)
               .depositAmount(timeDepositRequest.getDepositAmount())
               .startDate(timeDepositRequest.getStartDate())
               .status(DepositStatus.ACTIVE)
               .build();
       timeDeposit.setDepositType(timeDepositRequest.getDepositType());
       return timeDepositRepository.save(timeDeposit);
    }
}
